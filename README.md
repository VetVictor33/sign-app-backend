# Sign App - Backend

## Estrutura

```
src/
  ├── __tests__/          # Testes e2e
  ├── config/             # Configurações (rotas, paths)
  ├── controllers/        # Controladores HTTP
  ├── dtos/               # Data Transfer Objects
  ├── global/
  │   ├── errorHandlers/  # Tratadores de erro customizados
  │   ├── errors/         # Exceções da aplicação
  │   └── schemas/        # Validação con Zod
  ├── libs/               # Utilitários (Prisma, etc)
  ├── middleware/         # Middlewares (erro handler)
  ├── repositories/       # Camada de dados
  ├── services/           # Lógica de negócio
  ├── env.ts              # Validação de variáveis de ambiente
  └── server.ts           # Inicialização do servidor
prisma/
  ├── schema.prisma       # Schema do banco de dados
  └── migrations/         # Histórico de migrations
docker-compose.yml
```

## Setup

### Pré-requisitos

- Node.js 20.19.0+
- Docker e Docker Compose

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Banco de Dados

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Executar migrations
pnpm prisma migrate dev

# (Opcional) Abrir Prisma Studio
pnpx prisma studio
```

## Execução

```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

A aplicação roda em `http://localhost:3333` por padrão.

## Testes

```bash
# Testes unitários
pnpm test:unit

# Testes e2e
pnpm test:e2e

# Todos os testes
pnpm test
```

## Endpoints

### `POST /documents`

Criar documento

**Body (JSON):**

```json
{
  "titulo": "Contrato",
  "descricao": "Contrato 2026"
}
```

---

### `GET /documents`

Listar documentos

Sem body.

---

### `PATCH /documents/:id`

Atualizar status

Exemplo:

```
PATCH /documents/550e8400-e29b-41d4-a716-446655440000
```

**Body (JSON):**

```json
{
  "status": "assinado"
}
```

---

### `DELETE /documents/:id`

Deletar documento

Exemplo:

```
DELETE /documents/550e8400-e29b-41d4-a716-446655440000
```

Sem body.
