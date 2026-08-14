import type { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { DriverValidation } from "./driver.validation";
import { DriverService } from "./driver.service";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";
import { DriverRepository } from "./driver.repository";

export class DriverController {
  static async getAvailableAssignment(req: Request, res: Response) {
    const { query } = validate(DriverValidation.AVAILABLE_ASSIGNMENT, { query: req.query });

    const payload = res.locals.payload;
    const result = await DriverService.getAvailableAssignment({ payload, query });

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

  static async getActiveAssignment(_req: Request, res: Response) {
    const payload = res.locals.payload;

    const result = await DriverService.getActiveAssignment(payload);
    res.status(StatusCodes.OK).json({
      success: true,
      message: result ? "Tugas Aktif berhasil diterima!" : "Tidak ada Tugas Aktif!",
      data: result,
    });
  }

  static async startAssignment(req: Request, res: Response) {
    const { body, params } = validate(DriverValidation.START_ASSIGNMENT, { body: req.body, params: req.params });
    const payload = res.locals.payload;
    const result = await DriverService.startAssignment({ payload, body, params });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Tugas berhasil dimulai!",
      data: result,
    });
  }

  static async pickupCollected(req: Request, res: Response) {
    const { body, params } = validate(DriverValidation.PICKUP_COLLECTED, { body: req.body, params: req.params });
    const payload = res.locals.payload;

    const result = await DriverService.pickupCollected({ payload, body, params });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Pickup berhasil dikonfirmasi!",
      data: result,
    });
  }

  static async completeDelivery(req: Request, res: Response) {
    const { body, params } = validate(DriverValidation.COMPLETE_DELIVERY, { body: req.body, params: req.params });
    const payload = res.locals.payload;
    const result = await DriverService.completeDelivery({ payload, params, body });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Delivery berhasil diselesaikan!",
      data: result,
    });
  }

  static async getHistoryList(req: Request, res: Response) {
    const { query } = validate(DriverValidation.HISTORY_LIST, { query: req.query });
    const payload = res.locals.payload;

    const result = await DriverService.getHistoryList({ payload, query });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Daftar Riwayat berhasil didapatkan!",
      data: result.data,
      meta: result.meta,
    });
  }
}
