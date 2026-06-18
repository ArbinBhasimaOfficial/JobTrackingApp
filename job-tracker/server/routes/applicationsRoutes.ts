import express, { type Router } from "express";
import * as ctrl from "../controllers/applicationsController.js";
import { validateApplication } from "../middlewares/validateApplication.js";
import prisma from "../config/db.js";
const router: Router = express.Router();

router.get("/", ctrl.getAllApplications);
router.get("/:id", ctrl.getApplicationById);
router.post("/", validateApplication, ctrl.createApplication);
router.patch("/:id", validateApplication, ctrl.updateApplication);
router.delete("/:id", ctrl.deleteApplication);

export default router;
