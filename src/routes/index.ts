import { Router } from "express";
import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import employeeRoutes from "../features/employee/employee.route";
import outletRoutes from "../features/outlet/outlet.route";
import laundryItemRoutes from "../features/laundry-item/laundry-item.route";
import pricingRoutes from "../features/pricing/pricing.route";
import orderRoutes from "../features/order/order.route"
import bypassRoutes from "../features/bypass/bypass.route"

const router = Router();

router.use("/auth", authCustomerRoutes);
router.use("/auth/employee", authEmployeRoutes);
router.use("/internal/employees", employeeRoutes);
router.use("/internal/outlets", outletRoutes);
router.use("/internal/laundry-items", laundryItemRoutes);
router.use("/internal/pricing", pricingRoutes);
router.use("/internal/orders", orderRoutes)
router.use("/internal/bypass-requests", bypassRoutes)

export default router;
