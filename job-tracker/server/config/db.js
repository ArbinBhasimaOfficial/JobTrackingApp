import dotenv from "dotenv";
import pkgClient from "@prisma/client";
import pc from "picocolors";
import { withAccelerate } from "@prisma/extension-accelerate";
dotenv.config();
const { PrismaClient } = pkgClient;
if (!process.env.DATABASE_URL) {
    console.error(pc.red("DATABASE_URL is not defined in your .env file."));
    process.exit(1);
}
const basePrisma = new PrismaClient();
const prisma = basePrisma.$extends(withAccelerate());
export async function connectDB() {
    try {
        await basePrisma.$connect();
        console.log(pc.cyan(" Connected to PostgreSQL database via Prisma Cloud!"));
    }
    catch (error) {
        console.error(pc.red("Database connection error: "), error.message);
        process.exit(1);
    }
}
export default prisma;
//# sourceMappingURL=db.js.map