import dotenv from "dotenv";
import pkgClient from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import pc from "picocolors";

dotenv.config();

const { PrismaClient } = pkgClient;

if (!process.env.DATABASE_URL) {
  console.error(pc.red("DATABASE_URL is not defined in your .env file."));
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function connectDB() {
  try {
    // Test the adapter connection pool
    await prisma.$connect();
    console.log(
      pc.cyan(
        "Seamless connection to PostgreSQL database via Prisma 7 Driver Adapter!",
      ),
    );
  } catch (error) {
    console.error(pc.red("Database connection error: "), error.message);
    process.exit(1);
  }
}

export default prisma;
