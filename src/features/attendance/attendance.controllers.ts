import type { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AttendanceValidation } from "./attendance.validation";
import { AttendanceService } from "./attendance.service";
import { StatusCodes } from "http-status-codes";

export class AttendanceController {
  static async clockIn(req: Request, res: Response) {
    validate(AttendanceValidation.CLOCK_IN, { body: req.body });
    const payload = res.locals.payload;
    const result = await AttendanceService.clockIn(payload.sub);
    res.status(StatusCodes.CREATED).json({ success: true, message: "Clock in berhasil!", data: result });
  }

  static async clockOut(req: Request, res: Response) {
    validate(AttendanceValidation.CLOCK_OUT, { body: req.body });
    const payload = res.locals.payload;
    const result = await AttendanceService.clockOut(payload.sub);
    res.status(StatusCodes.OK).json({ success: true, message: "Clock Out berhasil!", data: result });
  }

  static async getHistory(req: Request, res: Response) {
    const { query } = validate(AttendanceValidation.HISTORY, { query: req.query });
    const payload = res.locals.payload;
    const result = await AttendanceService.getHistory({ employeeId: payload.sub, query });
    res.status(StatusCodes.OK).json({ success: true, message: "History Absensi berhasil didapat!", data: result.data, meta: result.meta });
  }

  static async getStatus(_req: Request, res: Response) {
    const payload = res.locals.payload;
    const result = await AttendanceService.getStatus(payload.sub);
    res.status(StatusCodes.OK).json({ success: true, message: "Status Absensi berhasil diterima!", data: result });
  }
}
