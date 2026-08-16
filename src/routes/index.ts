import { Router } from "express";
import { AttendanceRoute } from "../features/attendance/attendance.routes";
import { DriverRoute } from "../features/driver-task/driver.routes";

import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeeRoutes from "../features/authEmployee/authEmployee.routes";
import { WorkerRoute } from "../features/worker/worker.routes";

const router = Router();

router.use("/internal/attendance", AttendanceRoute);
router.use("/internal/driver/assignment", DriverRoute);
router.use("/internal/worker/assignment", WorkerRoute);

router.use("/auth", authCustomerRoutes);
router.use("/auth/employe", authEmployeeRoutes);

export default router;
