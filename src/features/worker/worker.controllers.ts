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
      message: "Berhasil mengambil daftar tugas yang tersedia",
      data: result.data,
      meta: result.meta,
    });
  }
  static async getPreClaimDetail(req: Request, res: Response) {
    const { params } = validate(WorkerValidation.PRE_CLAIM, { params: req.params });
    const payload = res.locals.payload;

    const result = await WorkerService.getPreClaimDetail({ workerId: payload.sub, params });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Detail tugas berhasil diterima!",
      data: result,
    });
  }
  static async getHistoryList(req: Request, res: Response) {
    const { query } = validate(WorkerValidation.HISTORY_LIST, { query: req.query });
    const payload = res.locals.payload;

    const result = await WorkerService.getHistoryList({ workerId: payload.sub, query });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Berhasil mengambil riwayat tugas!",
      data: result.data,
      meta: result.meta,
    });
  }

  static async claimAssignment(req: Request, res: Response) {
    const { params } = validate(WorkerValidation.CLAIM_ASSIGNMENT, { params: req.params });
    validate(WorkerValidation.CLAIM_ASSIGNMENT, { body: req.body });
    const payload = res.locals.payload;
    const result = await WorkerService.claimAssignment({ workerId: payload.sub, params });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Berhasil mengklaim tugas!",
      data: result,
    });
  }
}
