import { Router } from "express";
import authRoutes from "../features/auth/auth.routes"
import employeeRoutes from "../features/employee/employee.route"
import outletRoutes from "../features/outlet/outlet.route"

const router = Router();

router.use("/auth",authRoutes)
router.use("/internal/employees", employeeRoutes)
router.use("/internal/outlets", outletRoutes)

export default router;