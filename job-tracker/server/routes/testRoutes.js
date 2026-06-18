import express, {} from "express";
import { createApplication } from "../controllers/testController.js";
import { validateApplication } from "../middlewares/validateApplication.js";
const router = express.Router();
router.post("/testPost", validateApplication, createApplication);
export default router;
//# sourceMappingURL=testRoutes.js.map