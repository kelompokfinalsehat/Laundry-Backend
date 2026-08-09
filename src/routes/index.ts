import { Router } from "express";
import authRoutes from "../features/auth/auth.routes"
import employeeRoutes from "../features/employee/employee.route"
import outletRoutes from "../features/outlet/outlet.route"
import laundryItemRoutes from "../features/laundry-item/laundry-item.route"

const router = Router();

router.use("/auth",authRoutes)
router.use("/internal/employees", employeeRoutes)
router.use("/internal/outlets", outletRoutes)
router.use("/internal/laundry-items", laundryItemRoutes)

export default router;