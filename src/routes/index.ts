import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";
import { AttendanceRoute } from "../features/attendance/attendance.routes";
import { DriverRoute } from "../features/driver-task/driver.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/internal/attendance", AttendanceRoute);
router.use("/internal/driver", DriverRoute);

export default router;
