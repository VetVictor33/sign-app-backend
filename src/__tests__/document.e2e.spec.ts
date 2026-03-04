import { buildTestServer } from "@/__tests__/build-app.js";
import request from "supertest";

describe("Document E2E", () => {
  let repositoryMock: any;

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };
  });

  describe("POST /documents", () => {
    it("should create a document", async () => {
      repositoryMock.create.mockResolvedValue({
        id: "uuid-1",
        titulo: "Contrato",
        descricao: "Contrato 2024",
        status: "pendente",
        criado_em: new Date(),
      });

      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server).post("/documents").send({
        titulo: "Contrato",
        descricao: "Contrato 2024",
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.criadoEm).toBeDefined();
      expect(response.body.criado_em).toBeUndefined(); // garante DTO funcionando
    });

    it("should return 400 when titulo is missing", async () => {
      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server).post("/documents").send({
        descricao: "Contrato 2024",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation error");
    });
  });

  describe("GET /documents", () => {
    it("should list documents", async () => {
      repositoryMock.findAll.mockResolvedValue([
        {
          id: "uuid-1",
          titulo: "Contrato",
          descricao: "Contrato 2024",
          status: "pendente",
          criado_em: new Date(),
        },
      ]);

      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server).get("/documents");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("criadoEm");
    });
  });

  describe("PATCH /documents/:id", () => {
    it("should update status", async () => {
      repositoryMock.updateStatus.mockResolvedValue({
        id: "uuid-1",
        titulo: "Contrato",
        descricao: "Contrato 2024",
        status: "assinado",
        criado_em: new Date(),
      });

      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server)
        .patch("/documents/550e8400-e29b-41d4-a716-446655440000")
        .send({ status: "assinado" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("assinado");
    });

    it("should return 400 for invalid UUID", async () => {
      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server)
        .patch("/documents/invalid-id")
        .send({ status: "assinado" });

      expect(response.status).toBe(400);
    });

    it("should return 400 for invalid status", async () => {
      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server)
        .patch("/documents/550e8400-e29b-41d4-a716-446655440000")
        .send({ status: "outro" });

      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /documents/:id", () => {
    it("should delete document", async () => {
      repositoryMock.delete.mockResolvedValue({});

      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server).delete(
        "/documents/550e8400-e29b-41d4-a716-446655440000",
      );

      expect(response.status).toBe(204);
    });

    it("should return 400 for invalid UUID", async () => {
      const app = await buildTestServer(repositoryMock);

      const response = await request(app.server).delete(
        "/documents/invalid-id",
      );

      expect(response.status).toBe(400);
    });
  });
});
