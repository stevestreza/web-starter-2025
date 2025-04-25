## Web Starter 2025

A modern, full-stack project template for building web applications with a clean separation between backend and frontend components. This includes a backend and frontend implemented in TypeScript with a bunch of tools already established to get started quickly.

### Includes

#### Backend
- **Koa.js** - Web server framework
- **Prisma** - ORM for database access
- **Pino** - Logging framework

#### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and development server
- **Tailwind** - Utility-first CSS framework for rapid UI development

#### Both
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Package manager

### License

The **starter template** is licensed under the [Unlicense](https://unlicense.org). See LICENSE.starter.md. You may use this starter for any purpose without attribution, but I do not provide any warranty of its usage.

**VERY IMPORTANT: Update this license before you publish this code anywhere.**

### LLM Disclosure

Most of this starter kit was assembled with the help of LLM coding tools. While the code in this repository has been reviewed, you are encouraged to do your own review.

### Setup

1. Clone this repository, and remove the origin remote (or set it to `upstream` or something similar).
2. Update the license file in this repository and in the README
3. Edit `package.json` in the root, backend, and frontend folders with the appropriate metadata.
4. Update `backend/src/controllers/auth.ts` and change any constants for security purposes. Please note: We cannot provide any guidance on correct values here, and do not warrant that these are ever good security practice or up to date recommendations. **You are solely responsible for your own security!**
5. Run `pnpm install` in the root to setup dependencies.
6. Run `docker compose up -d` to start a development server.
7. Run `pnpm -F backend db:migrate` to set up the database.
8. Run `pnpm -F backend db:seed` to seed the database with a test user. (See `backend/prisma/seed.ts`)
9. Run `pnpm -F backend db:generate` to create the Prisma schema files, if they don't exist.
10. Run `pnpm dev` to start both the backend server and frontend build pipeline.
11. Open `http://localhost:5173/` in your browser to see the app in action!
