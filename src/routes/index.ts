import { Router } from "express";
import { AttendanceRoute } from "../features/attendance/attendance.routes";
import { DriverRoute } from "../features/driver-task/driver.routes";

import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeeRoutes from "../features/authEmployee/authEmployee.routes";
import { WorkerRoute } from "../features/worker/worker.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import addressCustomerRoutes from "../features/addressCustomer/address.routes";
import { Role } from "../../generated/prisma";

const router = Router();

router.use("/internal/attendance", AttendanceRoute);
router.use("/internal/driver", DriverRoute);
router.use("/internal/worker", WorkerRoute);

router.use("/auth", authCustomerRoutes);
router.use("/auth/employee", authEmployeeRoutes);


router.use("/profile", AuthMiddleware.authenticated(), profileCustomerRoutes);
router.use("/address", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.CUSTOMER]), addressCustomerRoutes);
export default router;
