import type { Request, Response } from "express";
import { validate } from "../../validations/validation";
import { AttendanceValidation } from "./attendance.validation";
import { AttendanceService } from "./attendance.service";
import { StatusCodes } from "http-status-codes";

export class AttendanceController {
  static async clockIn(req: Request, res: Response) {
    validate(AttendanceValidation.CLOCK_IN, {
      body: req.body,
    });

    const payload = res.locals.payload;

    const clockIn = await AttendanceService.clockIn(payload);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Clock in berhasil!",
      data: clockIn,
    });
  }

  static async clockOut(req: Request, res: Response) {
    validate(AttendanceValidation.CLOCK_OUT, { body: req.body });

    const payload = res.locals.payload;
    const clockOut = await AttendanceService.clockOut(payload)
    
  }
}
