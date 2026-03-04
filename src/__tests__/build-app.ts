import Fastify from "fastify";
import cors from "@fastify/cors";

import { registerErrorHandler } from "@/middleware/errorHandler.js";
import { DocumentController } from "@/controllers/document.controller.js";
import { DocumentService } from "@/services/document.service.js";
import type { DocumentRepository } from "@/repositories/document.repository.js";

export async function buildTestServer(repositoryMock: DocumentRepository) {
  const server = Fastify({ logger: false });

  registerErrorHandler(server);

  const service = new DocumentService(repositoryMock);
  const controller = new DocumentController(service);

  controller.register(server);

  await server.ready();

  return server;
}
