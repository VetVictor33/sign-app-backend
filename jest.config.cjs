module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  rootDir: ".",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.e2e.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  resolver: "<rootDir>/jest.resolver.cjs",
  moduleNameMapper: {
    "^@/generated/prisma/client": "<rootDir>/jest.prisma-client-mock.cjs",
  },
  transformIgnorePatterns: ["node_modules/(?!(supertest|@prisma|@fastify)/)"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/server.ts",
    "!src/**/__tests__/**",
  ],
};
