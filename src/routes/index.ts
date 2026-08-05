import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";
import { AttendanceRoute } from "../features/attendance/attendance.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/internal/attendance", AttendanceRoute);

export default router;
