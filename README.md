# Job Application Tracker API

A robust, type-safe REST API designed to help job seekers manage and track their application lifecycle. Built to ensure data integrity and ease of use, it allows users to organize applications by status and search through their history efficiently.

## Features
- **Full CRUD Operations:** Create, Read (all/single), Update (partial), and Delete job applications.
- **Filtering & Searching:** Supports filtering by status and searching by company or job title.
- **Data Validation:** Uses `express-validator` to ensure high-quality data input.
- **RESTful Architecture:** Clean separation of concerns with Controllers, Routes, and Middleware.
- **Database:** PostgreSQL integration via Prisma ORM for type-safe database access.

## Project Structure

```
  job-tracker/
  ├── client/              # Next.js frontend
  ├── server/              # Express + Prisma backend
  ├── pnpm-workspace.yaml  # Workspace configuration
  └── package.json         # Root configuration
```

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** express-validator
- **Tooling:** Nodemon, Morgan, Picocolors, cors, tsx

## Prerequisites
- Node.js
- pnpm or npm
- PostgreSQL database instance

## Installation

1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd job-tracker
```
2. **Install dependencies:**
```bash
    pnpm install
```
3. **Set up environment variables:**
```bash
  DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
  PORT=8080
  DEV_MODE="development" 
```
4. **Prisma Client**
```bash
    pnpm prisma generate
```
5. **Run the application:**
  ## for the backend
```bash
    pnpm --filter server run server
```

  ## start the frontend
```bash
    pnpm --filter client dev
```

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/applications` | Create a new job application |
| `GET` | `/api/v1/applications` | List all applications (supports `?status=` & `?search=`) |
| `GET` | `/api/v1/applications/:id` | Get details of a specific application |
| `PATCH` | `/api/v1/applications/:id` | Update an existing application |
| `DELETE` | `/api/v1/applications/:id` | Remove an application |

## Built with 

- Monorepo Manager: pnpm workspace
- Frontend: Next.js, TypeScript
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL, Prisma ORM
- Utilities: express-validator, nodemon, tsx, morgan, cors, picocolors
