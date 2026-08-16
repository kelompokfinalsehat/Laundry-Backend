import type { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { WorkerValidation } from "./worker.validation";
import { WorkerService } from "./worker.service";
import { StatusCodes } from "http-status-codes";

export class WorkerController {
  static async getAvailableAssignments(req: Request, res: Response) {
    const { query } = validate(WorkerValidation.AVAILABLE_ASSIGNMENT, { query: req.query });
    const payload = res.locals.payload;
    const result = await WorkerService.getAvailableAssignments({ workerId: payload.sub, query });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Daftar tugas tersedia berhasil diterima!",
      data: result.data,
      meta: result.meta,
    });
  }
  
}
