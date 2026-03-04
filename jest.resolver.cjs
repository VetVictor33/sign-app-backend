const fs = require("fs");
const path = require("path");

module.exports = (request, options) => {
  // Handle relative imports with .js extension
  if (request.startsWith("./") && request.endsWith(".js")) {
    const withoutExt = request.slice(0, -3);
    const tsPath = path.join(options.basedir, withoutExt + ".ts");
    if (fs.existsSync(tsPath)) {
      return tsPath;
    }
  }

  // Handle @/ imports with .js extension
  if (request.startsWith("@/") && request.endsWith(".js")) {
    const withoutExt = request.slice(0, -3);
    const parts = withoutExt.split("/");
    let resolvedPath;

    if (parts[1] === "generated") {
      resolvedPath =
        path.join(options.rootDir, "generated", ...parts.slice(2)) + ".ts";
    } else {
      resolvedPath =
        path.join(options.rootDir, "src", ...parts.slice(1)) + ".ts";
    }

    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }

  // Handle @/ imports without extension (resolve to .ts)
  if (request.startsWith("@/") && !request.endsWith(".js")) {
    const parts = request.split("/");
    let resolvedPath;

    if (parts[1] === "generated") {
      resolvedPath =
        path.join(options.rootDir, "generated", ...parts.slice(2)) + ".ts";
    } else {
      resolvedPath =
        path.join(options.rootDir, "src", ...parts.slice(1)) + ".ts";
    }

    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }

  // Fallback to default resolver
  return options.defaultResolver(request, options);
};
