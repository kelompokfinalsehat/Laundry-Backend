import { AccountStatus, CustomerStatus, Role, StationType, WorkerAssignmentStatus, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { WorkerActiveAssignmentDetail, WorkerValidateQuantitiesDetail, WorkerValidateQuantitiesInput } from "./worker.types";

export class WorkerHelper {
  static readonly MAX_ATTEMPT = 2;
  static assertWorkerValidity(worker: Employee | null): asserts worker is Employee & { currentOutletId: string } {
    if (!worker) throw new ResponseError("RESOURCE_NOT_FOUND", "Data tidak ditemukan!");
    if (worker.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (worker.role !== Role.WORKER) throw new ResponseError("FORBIDDEN");
    if (!worker.currentOutletId) throw new ResponseError("INVALID_STATE_TRANSITION", "Worker belum memiliki outlet aktif!");
  }

  static getAttendanceDateWIB(date: Date = new Date()) {
    const dateWIB = date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
    return new Date(`${dateWIB}T00:00:00.000Z`); // Mendapat Tanggal YY}YY-MM-DD
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
          attempt: assignment.attempt,
          maxAttempt: this.MAX_ATTEMPT,
          canValidate: assignment.attempt <= 2,
          canRequestBypass: assignment.attempt > 0,

          order: {
            ...baseResponse.order,
            items: assignment.order.orderItems.map((orderItem) => ({
              orderItemId: orderItem.id,
              laundryItem: { id: orderItem.laundryItem.id, name: orderItem.laundryItem.name },
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

  /*
  Pengecekan Rulesnya : 
  1. Jumlah ID sama ?
  2. ID yg dikirim sama ? 
  3. Cek perbedaan quantity ?
  */

  static compareQuantity({ orderItems, inputItems }: { orderItems: WorkerValidateQuantitiesDetail["order"]["orderItems"]; inputItems: WorkerValidateQuantitiesInput["body"]["items"] }) {
    if (orderItems.length !== inputItems.length) throw new ResponseError("VALIDATION_ERROR"); // [{a},{b},{c}] vs [{a},{b}]
    const inputMap = new Map(inputItems.map((input) => [input.orderItemId, input.submittedQuantity])); // ^ menjadi [[a,1],[b,2] new Map -> {a:1,b:2} jadi objek!
    const differences = orderItems
      .map((orderItem) => {
        const submittedQuantity = inputMap.get(orderItem.id); // mencari id OrderItem vs InputItem. .get(orderItem.id = key)
        if (submittedQuantity === undefined) throw new ResponseError("VALIDATION_ERROR");
        const difference = submittedQuantity - orderItem.quantity;
        return { orderItemId: orderItem.id, officialQuantity: orderItem.quantity, submittedQuantity, difference };
      })
      .filter((item) => item.difference !== 0);
    return { matched: differences.length === 0, differences };
  }

  static getCustomerStatusByStation(stationType: StationType): CustomerStatus {
    switch (stationType) {
      case StationType.WASHING:
        return CustomerStatus.WASHING;
      case StationType.IRONING:
        return CustomerStatus.IRONING;
      case StationType.PACKING:
        return CustomerStatus.PACKING;
      default:
        throw new ResponseError("INVALID_STATE_TRANSITION");
    }
  }
  static getNextStation(stationType: StationType): StationType | null {
    switch (stationType) {
      case StationType.WASHING:
        return StationType.IRONING;
      case StationType.IRONING:
        return StationType.PACKING;
      case StationType.PACKING:
        return null;
      default:
        throw new ResponseError("INVALID_STATE_TRANSITION");
    }
  }
}
