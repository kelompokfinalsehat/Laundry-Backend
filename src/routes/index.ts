import { Router } from "express";
import authCustomerRoute from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import addressCustomerRoutes from "../features/addressCustomer/address.routes";
import orderCustomerRoutes from "../features/orderCustomer/order.routes";
import regionAddressRoutes from "../features/region/region.routes";
import payementRoutes from "../features/paymentCustomer/payments.routes";
import { Role } from "../../generated/prisma";

const router = Router();

router.use("/auth", authCustomerRoute);
router.use("/auth/employee", authEmployeRoutes);
router.use("/profile", AuthMiddleware.authenticated(), profileCustomerRoutes);
router.use(
  "/address",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  addressCustomerRoutes,
);
router.use("/order", orderCustomerRoutes, payementRoutes);
router.use("/regions", AuthMiddleware.authenticated(), regionAddressRoutes);
export default router;
