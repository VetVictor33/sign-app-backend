import type { FastifyInstance } from "fastify";
import { DocumentController } from "./document.controller.js";
import { DocumentService } from "@/services/document.service.js";
import { DocumentRepository } from "@/repositories/document.repository.js";

export const allControllers = [
  new DocumentController(new DocumentService(new DocumentRepository())),
];

export const registerRoutes = async (server: FastifyInstance) => {
  for (const controller of allControllers) {
    controller.register(server);
  }
};
