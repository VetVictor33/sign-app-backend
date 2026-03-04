import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { routes } from "@/config/routes-paths.js";
import { DocumentService } from "@/services/document.service.js";

import {
  createDocumentSchema,
  updateStatusSchema,
  documentParamsSchema,
} from "@/global/schemas/document.schema.js";

export class DocumentController {
  constructor(private service: DocumentService) {}

  register(server: FastifyInstance) {
    server.post(routes.documents, this.create.bind(this));
    server.get(routes.documents, this.list.bind(this));
    server.patch(`${routes.documents}/:id`, this.updateStatus.bind(this));
    server.delete(`${routes.documents}/:id`, this.delete.bind(this));
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { titulo, descricao } = createDocumentSchema.parse(req.body);

    const document = await this.service.createDocument(titulo, descricao);

    return reply.status(201).send(document);
  }

  async list(_req: FastifyRequest, reply: FastifyReply) {
    const docs = await this.service.listDocuments();
    return reply.send(docs);
  }

  async updateStatus(req: FastifyRequest, reply: FastifyReply) {
    const { id } = documentParamsSchema.parse(req.params);
    const { status } = updateStatusSchema.parse(req.body);

    const updated = await this.service.changeStatus(id, status);

    return reply.send(updated);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = documentParamsSchema.parse(req.params);

    await this.service.deleteDocument(id);

    return reply.status(204).send();
  }
}
