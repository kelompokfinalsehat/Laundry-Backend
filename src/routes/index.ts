import { Router } from "express";
import { AttendanceRoute } from "../features/attendance/attendance.routes";
import { DriverRoute } from "../features/driver-task/driver.routes";

import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeeRoutes from "../features/authEmployee/authEmployee.routes";

const router = Router();

router.use("/internal/attendance", AttendanceRoute);
router.use("/internal/driver/tasks", DriverRoute);

router.use("/auth", authCustomerRoutes);
router.use("/auth/employe", authEmployeeRoutes);

export default router;
