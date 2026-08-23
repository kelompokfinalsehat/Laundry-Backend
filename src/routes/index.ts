import { Router } from "express";
import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes"
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import addressCustomerRoutes from "../features/addressCustomer/address.routes";
import { Role } from "../../generated/prisma";

const router = Router();

router.use("/auth", authCustomerRoutes);
router.use("/auth/employee", authEmployeRoutes);
router.use("/profile",AuthMiddleware.authenticated(),profileCustomerRoutes)
router.use(
  "/address",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  addressCustomerRoutes,
);
export default router;
