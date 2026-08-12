import { Router } from "express";
import { fakeAuth } from "../../middlewares/fake-auth.middleware";
import { AttendanceController } from "./attendance.controllers";
// ini fakeAuth nanti jangan lupa dihapus brok

export const AttendanceRoute = Router();

AttendanceRoute.post(
  "/clock-in",
  //Authenticated
  //Authorized
  fakeAuth,
  AttendanceController.clockIn,
);

AttendanceRoute.post("/clock-out", fakeAuth, AttendanceController.clockOut);
AttendanceRoute.get("/me", fakeAuth, AttendanceController.getHistory);
AttendanceRoute.get("/me/status", fakeAuth, AttendanceController.getMyAttendanceStatus);
