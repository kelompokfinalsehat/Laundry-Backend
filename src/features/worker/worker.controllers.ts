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
    res.status(StatusCodes.OK).json({ success: true, message: "Berhasil mengambil daftar tugas yang tersedia", data: result.data, meta: result.meta });
  }

  static async getHistoryList(req: Request, res: Response) {
    const { query } = validate(WorkerValidation.HISTORY_LIST, { query: req.query });
    const payload = res.locals.payload;

    const result = await WorkerService.getHistoryList({ workerId: payload.sub, query });
    res.status(StatusCodes.OK).json({ success: true, message: "Berhasil mengambil riwayat tugas!", data: result.data, meta: result.meta });
  }

  static async claimAssignment(req: Request, res: Response) {
    const { params } = validate(WorkerValidation.CLAIM_ASSIGNMENT, { params: req.params, body: req.body });
    const payload = res.locals.payload;
    const result = await WorkerService.claimAssignment({ workerId: payload.sub, assignmentId: params.assignmentId });
    res.status(StatusCodes.OK).json({ success: true, message: "Berhasil mengklaim tugas!", data: result });
  }

  static async getActive(_req: Request, res: Response) {
    const payload = res.locals.payload;
    const result = await WorkerService.getActive(payload.sub);
    res.status(StatusCodes.OK).json({ success: true, message: "Data tugas aktif berhasil diterima!", data: result });
  }

  static async validateQuantities(req: Request, res: Response) {
    const { params, body } = validate(WorkerValidation.VALIDATE_QUANTITIES, { params: req.params, body: req.body });
    const payload = res.locals.payload;
    const result = await WorkerService.validateQuantities({ workerId: payload.sub, assignmentId: params.assignmentId, items: body.items });
    res.status(StatusCodes.OK).json({ success: true, message: "Validasi berhasil dilakukan", data: result });
  }

  static async requestBypass(req: Request, res: Response) {
    const { params, body } = validate(WorkerValidation.REQUEST_BYPASS, { params: req.params, body: req.body });
    const payload = res.locals.payload;
    const result = await WorkerService.requestBypass({ workerId: payload.sub, assignmentId: params.assignmentId, items: body.items });
    res.status(StatusCodes.CREATED).json({ success: true, message: "Permintaan Bypass berhasil dilakukan!", data: result });
  }

  static async complete(req: Request, res: Response) {
    const { params } = validate(WorkerValidation.COMPLETE, { params: req.params, body: req.body });
    const payload = res.locals.payload;
    const result = await WorkerService.complete({ workerId: payload.sub, assignmentId: params.assignmentId });
    res.status(StatusCodes.OK).json({ success: true, message: "Complete Berhasil!", data: result });
  }
  static async getHistoryDetail(req: Request, res: Response) {
    const { params } = validate(WorkerValidation.HISTORY_DETAIL, { params: req.params });
    const payload = res.locals.payload;
    const result = await WorkerService.getHistoryDetail({ workerId: payload.sub, assignmentId: params.assignmentId });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Detail Riwayat dari tugas berhasil diterima!",
      data: result,
    });
  }
  
}
