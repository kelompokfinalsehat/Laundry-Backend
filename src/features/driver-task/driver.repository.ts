import { tr } from "zod/locales";
import { CustomerStatus, DriverAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { ACTIVE_TASK_SELECT } from "./driver.helper";

export class DriverRepository {
  static async findAvailableAssignment(
    where: Prisma.DriverAssignmentWhereInput,
    skip: number,
    take: number,
    sortOrder: "asc" | "desc",
  ) {
    const availableTask = await prisma.driverAssignment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: sortOrder },
      select: {
        id: true,
        taskType: true,
        createdAt: true,
        order: { select: { id: true, orderCode: true } },
      },
    });

    return availableTask;
  }

  // Mencari tugas aktif driver yg sedang login -> Mencegah claim 2 tugas, RULES satu driver satu tugas yg boleh di-claim
  static async findActiveByDriverId(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: { driverId, status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] } },
    });
    return activeAssignment;
  }

  //Mencari 1 assignment by id
  static async findAssignmentById(assignmentId: string) {
    return await prisma.driverAssignment.findUnique({
      where: { id: assignmentId },
      include: { order: { select: { customerStatus: true } } },
    });
  }

  static async claimAssignment(
    assignmentId: string,
    outletId: string,
    driverId: string,
    assignedAt: Date,

    tx: Prisma.TransactionClient,
  ) {
    const claimResult = await tx.driverAssignment.updateMany({
      where: { id: assignmentId, outletId: outletId, status: DriverAssignmentStatus.QUEUED, driverId: null },
      data: { driverId, status: DriverAssignmentStatus.ASSIGNED, assignedAt },
    });
    if (claimResult.count !== 1) {
      throw new ResponseError("ASSIGNMENT_ALREADY_CLAIMED");
    }
    return claimResult;
  }

  static async updateDriverWorkStatus(
    driverId: string,
    currentWorkStatus: WorkStatus,
    updatedWorkStatus: WorkStatus,
    tx: Prisma.TransactionClient,
  ) {
    const driverResult = await tx.employee.updateMany({
      where: { id: driverId, workStatus: currentWorkStatus },
      data: { workStatus: updatedWorkStatus },
    });
    if (driverResult.count !== 1) {
      throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    }

    return driverResult;
  }

  static async findUpdatedAssignment(assignmentId: string, tx: Prisma.TransactionClient) {
    return await tx.driverAssignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, taskType: true, status: true, assignedAt: true, pickedUpAt: true },
    });
  }

  static async findActiveAssignmentDetail(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: {
        driverId: driverId,
        status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] },
      },
      select: ACTIVE_TASK_SELECT,
    });
    return activeAssignment;
  }

  static async startAssignmentUpdate(assignmentId: string, currentDriverId: string, tx: Prisma.TransactionClient) {
    const result = await tx.driverAssignment.updateMany({
      where: { id: assignmentId, driverId: currentDriverId, status: DriverAssignmentStatus.ASSIGNED },
      data: { status: DriverAssignmentStatus.IN_PROGRESS },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Status tidak berubah!");
    return result;
  }
  static async startCustomerStatusUpdate(
    orderId: string,
    expectedOrderStatus: CustomerStatus,
    tx: Prisma.TransactionClient,
  ) {
    const result = await tx.order.updateMany({
      where: { id: orderId, customerStatus: expectedOrderStatus },
      data: { customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Status tidak berubah!");
    return result;
  }

  static async markPickupCollected(
    assignmentId: string,
    currentDriverId: string,
    pickedUpAt: Date,
    tx: Prisma.TransactionClient,
  ) {
    const result = await tx.driverAssignment.updateMany({
      where: {
        id: assignmentId,
        driverId: currentDriverId,
        status: DriverAssignmentStatus.IN_PROGRESS,
        pickedUpAt: null,
      },
      data: { pickedUpAt },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Pickup tidak dapat dikonfirmasi");
    return result;
  }

  static async updatePickupOrderToOutlet(orderId: string, tx: Prisma.TransactionClient) {
    const result = await tx.order.updateMany({
      where: { id: orderId, customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
      data: { customerStatus: CustomerStatus.ON_THE_WAY_TO_OUTLET },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Status Order tidak berubah!");
    return result;
  }

  static async completeDeliveryAssignment(
    assignmentId: string,
    currentDriverId: string,
    completedAt: Date,
    tx: Prisma.TransactionClient,
  ) {
    const result = await tx.driverAssignment.updateMany({
      where: {
        id: assignmentId,
        driverId: currentDriverId,
        status: DriverAssignmentStatus.IN_PROGRESS,
        completedAt: null,
      },
      data: {
        status: DriverAssignmentStatus.COMPLETED,
        deliveredAt: completedAt,
        completedAt: completedAt,
      },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Delivery tidak dapat diselesaikan!");
    return result;
  }

  static async updateCompleteDeliveryOrder(orderId: string, tx: Prisma.TransactionClient) {
    const result = await tx.order.updateMany({
      where: { id: orderId, customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
      data: {
        customerStatus: CustomerStatus.WAITING_CUSTOMER_CONFIRMATION,
      },
    });
    if (result.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Status order tidak berubah!");
    return result;
  }

  static async findHistoryList(
    where: Prisma.DriverAssignmentWhereInput,
    skip: number,
    take: number,
    sortOrder: "asc" | "desc",
  ) {
    return await prisma.driverAssignment.findMany({
      where,
      skip,
      take,
      orderBy: { completedAt: sortOrder },
      select: { id: true, taskType: true, completedAt: true, order: { select: { orderCode: true } } },
    });
  }
}
