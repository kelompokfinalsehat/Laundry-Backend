import { Router } from "express";
import { AttendanceController } from "./attendance.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

export const AttendanceRoute = Router();

AttendanceRoute.post("/clock-in", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER", "DRIVER"]), AttendanceController.clockIn);
AttendanceRoute.post("/clock-out", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER", "DRIVER"]), AttendanceController.clockOut);
AttendanceRoute.get("/history", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER", "DRIVER"]), AttendanceController.getHistory);
AttendanceRoute.get(
  "/status",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER", "DRIVER"]),
  AttendanceController.getStatus,
);
