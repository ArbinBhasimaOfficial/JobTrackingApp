import express, { type Router } from "express";
import { createApplication } from "../controllers/testController.js";
import { validateApplication } from "../middlewares/validateApplication.js";

const router: Router = express.Router();

router.post("/testPost", validateApplication, createApplication);

export default router;
