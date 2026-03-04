import type { DocumentStatus } from "@/generated/prisma/enums.js";
import type { DocumentRepository } from "@/repositories/document.repository.js";
import { DocumentResponseDto } from "@/dtos/document-response.dto.js";

export class DocumentService {
  constructor(private repository: DocumentRepository) {}

  async createDocument(titulo: string, descricao: string) {
    const document = await this.repository.create({ titulo, descricao });
    return DocumentResponseDto.fromEntity(document);
  }

  async listDocuments() {
    const documents = await this.repository.findAll();
    return DocumentResponseDto.fromEntities(documents);
  }

  async changeStatus(id: string, status: DocumentStatus) {
    const updated = await this.repository.updateStatus(id, status);
    return DocumentResponseDto.fromEntity(updated);
  }

  async deleteDocument(id: string) {
    return this.repository.delete(id);
  }
}
