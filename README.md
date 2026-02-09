# AM Dashboard - Fullstack Platform

> A modern administrative dashboard platform with React and NestJS.

## 🚀 Overview

This project is a high-performance administrative dashboard built with a modern fullstack architecture. It leverages a **Monorepo** structure with **Turborepo** and **pnpm** for optimal development experience and scalability.

## 🛠️ Tech Stack

- **Frontend (`apps/web`):** React + Vite + Tailwind CSS + shadcn/ui
- **Backend (`apps/api`):** NestJS + Prisma ORM + PostgreSQL
- **API Client Generation:** **Kubb** (Automated SDK generation from OpenAPI)
- **Shared Packages:**  
  - `@repo/api-sdk`: Generated API hooks and types using Kubb.
  - `@repo/schemas`: Shared Zod schemas for validation.
  - `@repo/typescript-config`: Centralized TS configurations.

## 📋 Features

- **Automated API SDK:** Uses Kubb to generate type-safe React Query hooks and Axios clients directly from NestJS Swagger.
- **Unified Validation:** Shared Zod schemas ensure consistency between API and Client.
- **Web-based:** Responsive dashboard accessible from any browser.
- **Secure Auth:** JWT with rotation via Refresh Tokens in HttpOnly cookies.
- **Interactive Analytics:** Data visualization with Recharts.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/am-dashboard.git
   cd am-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**
   
   Backend (`apps/api/.env`):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/amentoria"
   JWT_SECRET="super-secret"
   JWT_REFRESH_SECRET="super-refresh-secret"
   CORS_ORIGINS="http://localhost:5173"
   ```

   Frontend (`apps/web/.env`):
   ```env
   VITE_API_URL="http://localhost:3333"
   ```

4. **Prepare Database**
   ```bash
   # Generate Prisma Client
   pnpm prisma:generate
   
   # Run migrations and seed data
   pnpm prisma:migrate
   pnpm prisma:seed
   ```

5. **Generate API SDK**
   ```bash
   # Generate Swagger JSON from NestJS
   pnpm --filter api swagger:generate
   
   # Run Kubb to generate the SDK
   pnpm --filter @repo/api-sdk generate
   ```

6. **Run Development**
   ```bash
   pnpm dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3333
   - Swagger Docs: http://localhost:3333/api/docs

## 🔑 Test Credentials

| Role      | Email                 | Password |
| --------- | --------------------- | -------- |
| **Admin** | `admin@amentoria.com` | `123456` |
| **User**  | `teste@amentoria.com` | `123456` |

## 🧪 Running Tests

- **API Unit Tests:** `pnpm --filter api test`
- **E2E Tests (Frontend):** `pnpm --filter web test` (requires running app)

## Folder Structure

- `apps/api`: NestJS backend.
- `apps/web`: React web frontend.
- `packages/api-sdk`: Auto-generated API client using Kubb.
- `packages/schemas`: Manual Zod schemas.

---

Built with ❤️ for A Mentoria ENEM.
