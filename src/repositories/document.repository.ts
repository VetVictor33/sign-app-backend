import { getPrismaInstance } from "@/libs/prisma.js";
import type { DocumentStatus } from "@/generated/prisma/enums.js";
import type { PrismaClient } from "@/generated/prisma/client.js";

export class DocumentRepository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaInstance();
  }
  async create(data: { titulo: string; descricao: string }) {
    return this.prisma.documento.create({ data });
  }

  async findAll() {
    return this.prisma.documento.findMany({
      orderBy: { criado_em: "desc" },
    });
  }

  async updateStatus(id: string, status: DocumentStatus) {
    return this.prisma.documento.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string) {
    return this.prisma.documento.delete({
      where: { id },
    });
  }
}
