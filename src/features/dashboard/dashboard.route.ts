import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { DashboardController } from "./dashboard.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]))
router.get("/", DashboardController.getDashboard)

export default router