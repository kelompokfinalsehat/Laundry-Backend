import { AccountStatus, Role, WorkerAssignmentStatus, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { WorkerActiveAssignmentDetail } from "./worker.repository";

export class WorkerHelper {
  static assertWorkerValidity(worker: Employee | null): asserts worker is Employee {
    if (!worker) throw new ResponseError("RESOURCE_NOT_FOUND", "Data tidak ditemukan!");
    if (worker.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (worker.role !== Role.WORKER) throw new ResponseError("FORBIDDEN");
    if (!worker.currentOutletId)
      throw new ResponseError("INVALID_STATE_TRANSITION", "Worker belum memiliki outlet aktif!");
  }

  private static buildBaseResponse(assignment: WorkerActiveAssignmentDetail) {
    const baseResponse = {
      id: assignment.id,
      stationType: assignment.stationType,
      status: assignment.status,
      assignedAt: assignment.assignedAt,
      startedAt: assignment.startedAt,
      order: {
        id: assignment.order.id,
        orderCode: assignment.order.orderCode,
      },
    };
    return baseResponse;
  }
  static buildActiveAssignmentResponse(assignment: WorkerActiveAssignmentDetail) {
    const baseResponse = this.buildBaseResponse(assignment);
    switch (assignment.status) {
      case WorkerAssignmentStatus.ASSIGNED:
        return {
          ...baseResponse,
          order: {
            ...baseResponse.order,
            items: assignment.order.orderItems.map((orderItems) => ({
              orderItemId: orderItems.id,
              laundryItem: { id: orderItems.laundryItem.id, name: orderItems.laundryItem.name },
            })),
          },
        };
      case WorkerAssignmentStatus.IN_PROGRESS:
      case WorkerAssignmentStatus.ON_HOLD_BYPASS:
        return baseResponse;
      default:
        throw new ResponseError("INVALID_STATE_TRANSITION");
    }
  }
}
