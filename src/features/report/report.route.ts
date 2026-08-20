import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { ReportController } from "./report.controller";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]))
router.get("/sales", ReportController.getSalesReport)
router.get("/employee-performance", ReportController.getEmployeePerformanceReport)

export default router