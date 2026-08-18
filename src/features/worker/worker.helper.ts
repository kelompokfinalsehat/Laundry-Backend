import { AccountStatus, CustomerStatus, Role, StationType, WorkerAssignmentStatus, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { WorkerActiveAssignmentDetail, WorkerValidateQuantitiesDetail } from "./worker.repository";
import type { WorkerValidateQuantitiesInput } from "./worker.validation";

export class WorkerHelper {
  static assertWorkerValidity(worker: Employee | null): asserts worker is Employee {
    if (!worker) throw new ResponseError("RESOURCE_NOT_FOUND", "Data tidak ditemukan!");
    if (worker.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (worker.role !== Role.WORKER) throw new ResponseError("FORBIDDEN");
    if (!worker.currentOutletId) throw new ResponseError("INVALID_STATE_TRANSITION", "Worker belum memiliki outlet aktif!");
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

  // static checkQuantity({
  //   orderItems,
  //   inputItems,
  // }: {
  //   orderItems: WorkerValidateQuantitiesDetail["order"]["orderItems"];
  //   inputItems: WorkerValidateQuantitiesInput["body"]["items"];
  // }) {
  //   // pengecekan panjang dulu, biar sejak awal tahu worker kirimnya bener atau ga
  //   if (inputItems.length !== orderItems.length) throw new ResponseError("VALIDATION_ERROR");

  //   /*
  //   orderItems & inputItems itu array of objects
  //   [{ID : "a", quantity : 10},{ID : "b", quantity : 25}]
  //   kita ubah dulu ke object

  //   caranya pakai new Map()
  //   */
  //   const inputMap = new Map(inputItems.map((input) => [input.orderItemId, input.actualQuantity]));
  //   //kita cari perbedaan-perbedaan. OrderITems.map karna dia source truthnya
  //   const differences = orderItems
  //     .map((orderItem) => {
  //       const actualQuantity = inputMap.get(orderItem.id); // ngecek satu per satu orderItem id ada ga di inputItem ID
  //       // get kalau tidak ketemu mereturn undefined
  //       if (actualQuantity === undefined) throw new ResponseError("VALIDATION_ERROR");
  //       const difference = actualQuantity - orderItem.quantity;
  //       return { orderItemId: orderItem.id, officialQuantity: orderItem.quantity, actualQuantity, difference };
  //     })
  //     .filter((item) => item.difference !== 0);
  //   return { matched: differences.length === 0, differences };
  // }
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
}
