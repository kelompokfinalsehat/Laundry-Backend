import { Router } from "express";
import authRoutes from "../features/auth/auth.routes"
import employeeRoutes from "../features/employee/employee.route"

const router = Router();

router.use("/auth",authRoutes)
router.use("/internal/super-admin/employees", employeeRoutes)

export default router;