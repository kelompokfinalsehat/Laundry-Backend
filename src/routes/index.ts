import { Router } from "express";
import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes"
import { AuthMiddleware } from "../middlewares/auth.middlewares";

const router = Router();

router.use("/auth", authCustomerRoutes);
router.use("/auth/employe", authEmployeRoutes);
router.use("/profile",AuthMiddleware.authenticated(),profileCustomerRoutes)
export default router;
