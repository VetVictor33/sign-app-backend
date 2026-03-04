import { DocumentResponseDto } from "@/dtos/document-response.dto.js";
import { DocumentService } from "@/services/document.service.js";

describe("DocumentService (unit)", () => {
  let repositoryMock: any;
  let service: DocumentService;

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };

    service = new DocumentService(repositoryMock);
  });

  describe("createDocument", () => {
    it("should call repository.create with correct params", async () => {
      const fakeEntity = {
        id: "uuid-1",
        titulo: "Contrato",
        descricao: "Contrato 2024",
        status: "pendente",
        criado_em: new Date(),
      };

      repositoryMock.create.mockResolvedValue(fakeEntity);

      const result = await service.createDocument("Contrato", "Contrato 2024");

      expect(repositoryMock.create).toHaveBeenCalledWith({
        titulo: "Contrato",
        descricao: "Contrato 2024",
      });

      expect(result).toBeInstanceOf(DocumentResponseDto);
      expect(result).toHaveProperty("criadoEm");
      expect((result as any).criado_em).toBeUndefined();
    });
  });

  describe("listDocuments", () => {
    it("should call repository.findAll and map to DTO", async () => {
      const fakeEntities = [
        {
          id: "uuid-1",
          titulo: "Contrato",
          descricao: "Contrato 2024",
          status: "pendente",
          criado_em: new Date(),
        },
      ];

      repositoryMock.findAll.mockResolvedValue(fakeEntities);

      const result = await service.listDocuments();

      expect(repositoryMock.findAll).toHaveBeenCalled();

      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(DocumentResponseDto);
      expect(result[0]).toHaveProperty("criadoEm");
    });
  });

  describe("changeStatus", () => {
    it("should call repository.updateStatus with correct params", async () => {
      const fakeEntity = {
        id: "uuid-1",
        titulo: "Contrato",
        descricao: "Contrato 2024",
        status: "assinado",
        criado_em: new Date(),
      };

      repositoryMock.updateStatus.mockResolvedValue(fakeEntity);

      const result = await service.changeStatus("uuid-1", "assinado" as any);

      expect(repositoryMock.updateStatus).toHaveBeenCalledWith(
        "uuid-1",
        "assinado",
      );

      expect(result).toBeInstanceOf(DocumentResponseDto);
      expect(result.status).toBe("assinado");
    });
  });

  describe("deleteDocument", () => {
    it("should call repository.delete with correct id", async () => {
      repositoryMock.delete.mockResolvedValue(undefined);

      await service.deleteDocument("uuid-1");

      expect(repositoryMock.delete).toHaveBeenCalledWith("uuid-1");
    });
  });
});
