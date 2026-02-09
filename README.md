# AM Dashboard - Fullstack Platform

> A modern administrative dashboard platform with React, Expo, and NestJS.

## 🚀 Overview

This project is a high-performance administrative dashboard built with a modern fullstack architecture. It leverages a **Monorepo** structure with **Turborepo** and **pnpm** for optimal development experience and scalability.

## 🛠️ Tech Stack

- **Frontend (`apps/web`):** React + Vite + Tailwind CSS + shadcn/ui
- **Backend (`apps/api`):** NestJS + Prisma ORM + PostgreSQL
- **Type Safety:** **Kubb** (Automated SDK generation from OpenAPI)
- **Documentation:** **Mintlify** (Beautiful, AI-native documentation)
- **Shared Packages:** 
  - `@repo/api-sdk`: Generated API hooks and types using Kubb.
  - `@repo/schemas`: Shared Zod schemas for validation.
  - `@repo/typescript-config`: Centralized TS configurations.

## 📋 Features

- **Automated API SDK:** Uses Kubb to generate type-safe React Query hooks and Axios clients directly from NestJS Swagger.
- **Unified Validation:** Shared Zod schemas ensure consistency between API and Client.
- **Cross-Platform:** Dashboard accessible via Web.
- **Secure Auth:** JWT with rotation via Refresh Tokens in HttpOnly cookies.
- **Interactive Analytics:** Data visualization with Recharts.

## 📖 Documentation

The documentation is powered by **Mintlify**. You can find the source files in the `docs/` folder.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (optional)

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Generate API SDK**
   ```bash
   # Generate Swagger JSON from NestJS
   pnpm --filter api swagger:generate
   
   # Run Kubb to generate the SDK
   pnpm --filter @repo/api-sdk generate
   ```

3. **Run Development**
   ```bash
   pnpm dev
   ```

## Folder Structure

- `apps/api`: NestJS backend.
- `apps/web`: React web frontend.
- `packages/api-sdk`: Auto-generated API client using Kubb.
- `packages/schemas`: Manual Zod schemas.
- `docs/`: Markdown files for Mintlify documentation.

---

Built with ❤️ for A Mentoria ENEM.
