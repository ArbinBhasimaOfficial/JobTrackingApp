// imports
import "dotenv/config";
import express, { type Express } from "express";
import { connectDB } from "./config/db.js";
import applicationsRoutes from "./routes/applicationsRoutes.js";
import pc from "picocolors";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;
const DEV_MODE = process.env.DEV_MODE;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/applications", applicationsRoutes);

await connectDB();
app.listen(PORT, () => {
  console.log(
    pc.cyan(`Server is running in ${DEV_MODE} mode on the port ${PORT}`),
  );
});
