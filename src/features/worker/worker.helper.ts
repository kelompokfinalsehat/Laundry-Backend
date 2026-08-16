import { response } from "express";
import { AccountStatus, Role, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class WorkerHelper {
  static assertWorkerValidity(worker: Employee | null): asserts worker is Employee {
    if (!worker) throw new ResponseError("RESOURCE_NOT_FOUND", "Data tidak ditemukan!");
    if (worker.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (worker.role !== Role.WORKER) throw new ResponseError("FORBIDDEN");
    if (!worker.currentOutletId)
      throw new ResponseError("INVALID_STATE_TRANSITION", "Worker belum memiliki outlet aktif!");
  }
}
