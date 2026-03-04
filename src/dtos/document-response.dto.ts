import type { Documento } from "@/generated/prisma/client.js";

export class DocumentResponseDto {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  criadoEm: Date;

  constructor(partial: Documento) {
    this.id = partial.id;
    this.titulo = partial.titulo;
    this.descricao = partial.descricao;
    this.status = partial.status;
    this.criadoEm = partial.criado_em;
  }

  static fromEntity(entity: Documento): DocumentResponseDto {
    return new DocumentResponseDto(entity);
  }

  static fromEntities(entities: Documento[]): DocumentResponseDto[] {
    return entities.map((entity) => new DocumentResponseDto(entity));
  }
}
