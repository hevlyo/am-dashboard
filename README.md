# AM Dashboard - Plataforma de Cursos

> Dashboard administrativo desenvolvido para o processo seletivo da A Mentoria ENEM.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando um **Monorepo** com **Turborepo** e **pnpm**, com uma arquitetura escalável e moderna.

### Frontend (`apps/web`)

- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Design System)
- **TanStack Query** (Gerenciamento de estado servidor)
- **React Hook Form** + **Zod** (Formulários e validação)
- **Recharts** (Visualização de dados)
- **Framer Motion** (Animações)

### Backend (`apps/api`)

- **NestJS** (Framework Node.js)
- **TypeScript**
- **Prisma ORM** (Database access)
- **PostgreSQL** (Neon DB)
- **Passport** + **JWT** (Autenticação segura com Refresh Token)
- **Swagger** (Documentação da API)

### Shared (`packages/*`)

- **@repo/schemas**: Schemas Zod compartilhados entre frontend e backend (DRY)
- **@repo/typescript-config**: Configurações TS base
- **@repo/eslint-config**: Configurações de Linting

---

## 📋 Funcionalidades Implementadas

### Autenticação ✅

- Login e Logout
- **Refresh Token** automático (rotação de tokens segura)
- Proteção de rotas (Guards no backend, Wrapper no frontend)
- Armazenamento de Refresh Token em cookie `httpOnly`

### Dashboard & Filtros ✅

- **4 Tipos de Gráficos**: Barras, Linha, Pizza, Área
- **4 Tipos de Filtros**: Data (Range), Select, Texto, Checkbox
- Filtros persistem no localStorage e recarregam dados automaticamente
- **Cards de Métricas**: Total de alunos, matrículas, progresso, etc.

### UX/UI ✅

- **Dark Mode** / Light Mode
- Design Responsivo (Mobile First)
- Loading States (Skeletons)
- Feedback visual de erros (Toasts/Alerts)

---

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Docker (opcional, se quiser rodar banco local)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/am-dashboard.git
   cd am-dashboard
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   Este projeto separa variáveis por app (não usa `.env` na raiz).

   ```bash
   # Backend
   cp .env.example apps/api/.env

   # Frontend
   # Crie apps/web/.env apenas com VITE_API_URL
   ```

   > **Nota:** Para o banco de dados, você pode usar uma instância local do Postgres ou criar uma gratuita no [Neon.tech](https://neon.tech).

4. **Prepare o Banco de Dados**

   ```bash
   # Gera o client do Prisma
   pnpm prisma:generate

   # Roda as migrations e aplica o seed (dados de teste)
   pnpm prisma:migrate
   pnpm prisma:seed
   ```

5. **Rode a aplicação**

   ```bash
   pnpm dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:3333
   - Swagger Docs: http://localhost:3333/api/docs

### Notas de Teste

- O Jest usa `bcryptjs` via `moduleNameMapper` para evitar avisos de depreciação do Node ao importar `bcrypt` em ambiente de teste.
- Para rodar testes localmente:
  - API: `pnpm --filter api test`
  - Web (E2E Playwright): `pnpm --filter web test` (requer frontend/API rodando e banco populado)

---

## 🔑 Credenciais de Teste

Para acessar o sistema, utilize as credenciais geradas pelo seed:

| Perfil    | Email                 | Senha    |
| --------- | --------------------- | -------- |
| **Admin** | `admin@amentoria.com` | `123456` |
| **User**  | `teste@amentoria.com` | `123456` |

---

## 🌐 Links de Deploy

| Ambiente         | URL                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Frontend**     | [am-dashboard-web.vercel.app](https://am-dashboard-web.vercel.app)                         |
| **Backend API**  | [am-dashboard-wpz8.onrender.com](https://am-dashboard-wpz8.onrender.com)                   |
| **Swagger Docs** | [am-dashboard-wpz8.onrender.com/api/docs](https://am-dashboard-wpz8.onrender.com/api/docs) |

> **Nota**: O backend no Render pode levar alguns segundos para iniciar na primeira requisição (cold start do plano gratuito).

---

## 🚀 Deploy (Vercel + Render)

### Backend (Render)

**Build Command**

```bash
NODE_ENV=development pnpm install --frozen-lockfile && pnpm --filter @repo/schemas build && pnpm --filter api exec prisma generate && pnpm --filter api build
```

**Start Command**

```bash
node apps/api/dist/src/main.js
```

**Env Vars**

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CORS_ORIGINS` (ex.: `https://am-dashboard-web.vercel.app`)
- `NODE_ENV=production`
- `PORT=10000`

### Frontend (Vercel)

**Root Directory**: `apps/web`

**Env Vars**

- `VITE_API_URL=https://am-dashboard-wpz8.onrender.com`

> Com o Root Directory em `apps/web`, o `vercel.json` local é aplicado automaticamente.

---

## 🚢 CI

O projeto está preparado para integração com pipelines de **CI**:

- **Qualidade**: Suporte para Lint, Type Check e Testes (configuração pronta para GitHub Actions).

> Deploys são feitos automaticamente pelas integrações da Vercel e Render com o repositório.
