import { Router } from "express";
import ResourceController from "../controller/ResourceController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

// Get all resources
router.get("/", [checkJwt, checkRole(["admin"])], ResourceController.listAll);

export default router;