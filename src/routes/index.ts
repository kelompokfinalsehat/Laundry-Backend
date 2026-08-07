import { Router } from "express";
import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";

const router = Router();

router.use("/auth", authCustomerRoutes);
router.use("/auth/employe", authEmployeRoutes);
export default router;
