import { registerRoutes } from "@/controllers/index.js";
import { getEnv } from "@/env.js";
import { registerErrorHandler } from "@/middleware/errorHandler.js";
import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";

const env = getEnv();

const server: FastifyInstance = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
        singleLine: false,
      },
    },
  },
  disableRequestLogging: true,
});

server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
});
registerErrorHandler(server);

await registerRoutes(server);

const start = async () => {
  try {
    const port = env.PORT;
    await server.listen({ port, host: "0.0.0.0" });

    server.log.info(`Server running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
