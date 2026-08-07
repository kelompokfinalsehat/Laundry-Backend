import type { Request, Response } from "express";
import { validate } from "../../validations/validation";
import { AttendanceValidation } from "./attendance.validation";
import { AttendanceService } from "./attendance.service";
import { StatusCodes } from "http-status-codes";
import type { ResponseError } from "../../utils/response-error.utils";
import { success } from "zod";
import { meta } from "zod/v4/core";

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
    const clockOut = await AttendanceService.clockOut(payload);
  }

  static async history(req: Request, res: Response) {
    const { query } = validate(AttendanceValidation.HISTORY, { query: req.query });

    const payload = res.locals.payload;

    const result = await AttendanceService.getHistory({ payload, query });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "History Absensi berhasil didapat!",
      data: result.data,
      meta: result.meta,
    });
  }
}
