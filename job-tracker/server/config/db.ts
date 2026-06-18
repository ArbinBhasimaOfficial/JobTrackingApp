import "dotenv/config";
import { PrismaClient } from "../generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import pc from "picocolors";

if (!process.env.DATABASE_URL) {
  console.error(pc.red("DATABASE_URL is not defined in your .env file."));
  process.exit(1);
}

// Set up the connection pool for the driver adapter
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the required adapter
export const prisma = new PrismaClient({ adapter });

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log(pc.cyan("Connected to PostgreSQL database via Prisma v7!"));
  } catch (error: any) {
    console.error(pc.red("Database connection error: "), error.message);
    process.exit(1);
  }
}

export default prisma;
