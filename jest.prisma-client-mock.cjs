// Mock do Prisma Client para testes
module.exports = {
  PrismaClient: class MockPrismaClient {
    constructor() {
      this.documento = {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
    }
  },
  PrismaPg: class MockPrismaPg {},
};
