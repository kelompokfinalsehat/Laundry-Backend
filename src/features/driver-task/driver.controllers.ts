import type { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { DriverValidation } from "./driver.validation";
import { DriverService } from "./driver.service";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";

export class DriverController {
  static async getAvailableTasks(req: Request, res: Response) {
    const { query } = validate(DriverValidation.AVAILABLE_TASKS, { query: req.query });

    const payload = res.locals.payload;
    const result = await DriverService.getAvailableTasks({ payload, query });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "List Tugas Tersedia berhasil didapat!",
      data: result.data,
      meta: result.meta,
    });
  }

  static async claimAssignment(req: Request, res: Response) {
    const { params, body } = validate(DriverValidation.CLAIM_ASSIGNMENT, { params: req.params, body: req.body });

    const payload = res.locals.payload;

    const result = await DriverService.claimAssignment({ payload, params, body });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Tugas berhasil diambil!",
      data: result,
    });
  }

  static async getActiveTask(_req: Request, res: Response) {
    const payload = res.locals.payload;

    const result = await DriverService.getActiveTask(payload);
    res.status(StatusCodes.OK).json({
      success: true,
      message: result ? "Tugas Aktif berhasil diterima!" : "Tidak ada Tugas Aktif!",
      data: result,
    });
  }
}
