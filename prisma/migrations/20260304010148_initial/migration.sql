-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('pendente', 'assinado');

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'pendente',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);
