import { z } from "zod";

export const createDocumentSchema = z.object({
  titulo: z
    .string()
    .min(1, "Título é obrigatório")
    .max(256, "Título deve ter no máximo 256 caracteres"),
  descricao: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(256, "Descrição deve ter no máximo 256 caracteres"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["pendente", "assinado"]),
});

export const documentParamsSchema = z.object({
  id: z.uuid("ID inválido"),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type DocumentParams = z.infer<typeof documentParamsSchema>;
