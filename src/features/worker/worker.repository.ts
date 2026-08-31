import {
  BillPaymentStatus,
  BypassStatus,
  CustomerStatus,
  DriverAssignmentStatus,
  PickupDeliveryType,
  WorkerAssignmentStatus,
  WorkStatus,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type {
  CompleteTransactionTypes,
  CreateBypassTypes,
  FindAvailablePaginated,
  FindHistoryPaginated,
  UpdateValidateTransactionTypes,
} from "./worker.types";

export class WorkerRepository {
  static async findAvailablePaginated({ where, skip, take, sortOrder }: FindAvailablePaginated) {
    return prisma.$transaction([
      prisma.workerAssignment.count({ where }),
      prisma.workerAssignment.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: sortOrder },
        select: { id: true, stationType: true, createdAt: true, order: { select: { id: true, orderCode: true } } },
      }),
    ]);
  }

  static async findHistoryPaginated({ where, skip, take, sortOrder }: FindHistoryPaginated) {
    return prisma.$transaction([
      prisma.workerAssignment.count({ where }),
      prisma.workerAssignment.findMany({
        where,
        skip,
        take,
        orderBy: { completedAt: sortOrder },
        select: { id: true, stationType: true, completedAt: true, order: { select: { id: true, orderCode: true } } },
      }),
    ]);
  }

  static async claimAssignment({ assignmentId, workerId, workerOutletId }: { assignmentId: string; workerId: string; workerOutletId: string }) {
    return prisma.$transaction(async (tx) => {
      const claimedAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, outletId: workerOutletId, status: WorkerAssignmentStatus.QUEUED, workerId: null },
        data: { status: WorkerAssignmentStatus.ASSIGNED, workerId: workerId, assignedAt: new Date() },
      });
      if (claimedAssignment.count !== 1) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak tersedia!");
      const updateWorkStatus = await tx.employee.updateMany({
        where: { id: workerId, workStatus: WorkStatus.AVAILABLE },
        data: { workStatus: WorkStatus.BUSY },
      });
      if (updateWorkStatus.count !== 1) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
      return tx.workerAssignment.findFirst({
        where: { id: assignmentId }, //mereturn updatedAssignment untuk shaped Response ke FRONTEND
        select: { id: true, stationType: true, status: true, assignedAt: true, order: { select: { id: true, orderCode: true } } },
      });
    });
  }

  static async findActiveAssignmentDetail(workerId: string) {
    return prisma.workerAssignment.findFirst({
      where: {
        workerId: workerId,
        status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS] },
      },
      select: {
        id: true,
        stationType: true,
        status: true,
        assignedAt: true,
        startedAt: true,
        attempt: true,
        order: {
          select: { id: true, orderCode: true, orderItems: { select: { id: true, laundryItem: { select: { id: true, name: true } } } } },
        },
      },
    });
  }
  static async findValidatableAssignment({ workerId, assignmentId }: { workerId: string; assignmentId: string }) {
    return prisma.workerAssignment.findFirst({
      where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED },
      select: {
        id: true,
        stationType: true,
        attempt: true,
        order: {
          select: {
            id: true,
            orderItems: { select: { id: true, quantity: true } },
            //tidak butuh landryname (seperti di /active), butuh orderItemsId dan quantity untuk perbandingan!
          },
        },
      },
    });
  }
  static async addValidateAttempt({ workerId, assignmentId, currentAttempt }: { workerId: string; assignmentId: string; currentAttempt: number }) {
    const attempt = await prisma.workerAssignment.updateMany({
      where: { id: assignmentId, workerId: workerId, attempt: currentAttempt },
      data: { attempt: { increment: 1 } },
    });
    if (attempt.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Data percobaan gagal diubah!");
    return attempt;
  }
  static async updateValidateTransaction({ workerId, assignmentId, orderId, customerStatus, currentAttempt }: UpdateValidateTransactionTypes) {
    return prisma.$transaction(async (tx) => {
      const updatedAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED, attempt: currentAttempt },
        data: { startedAt: new Date(), status: WorkerAssignmentStatus.IN_PROGRESS, attempt: { increment: 1 } },
      });
      if (updatedAssignment.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      await tx.order.update({ where: { id: orderId }, data: { customerStatus: customerStatus } });
      return tx.workerAssignment.findFirst({
        where: { id: assignmentId },
        select: { id: true, status: true, stationType: true, startedAt: true, order: { select: { id: true, orderCode: true } } },
      });
    });
  }

  static async createBypassTransaction({ assignmentId, workerId, orderId, stationType, differences }: CreateBypassTypes) {
    return prisma.$transaction(async (tx) => {
      const updateAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED },
        data: { status: WorkerAssignmentStatus.ON_HOLD_BYPASS },
      });
      if (updateAssignment.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      await tx.bypassRequest.create({
        data: {
          orderId: orderId,
          workerAssignmentId: assignmentId,
          stationType,
          requestedBy: workerId,
          quantityDiffJson: JSON.stringify({ items: differences }),
          status: BypassStatus.PENDING,
        },
      });
      return tx.workerAssignment.update({
        where: { id: assignmentId, status: WorkerAssignmentStatus.ON_HOLD_BYPASS },
        data: { attempt: 0 },
        select: { id: true, status: true, stationType: true, startedAt: true, order: { select: { id: true, orderCode: true } } },
      });
    });
  }
  static async findCompletableAssignment({ workerId, assignmentId }: { workerId: string; assignmentId: string }) {
    return prisma.workerAssignment.findFirst({
      where: { id: assignmentId, workerId, status: WorkerAssignmentStatus.IN_PROGRESS },
      select: { id: true, outletId: true, stationType: true, order: { select: { id: true, orderCode: true, customerStatus: true } } },
    });
  }

  static async completeTransaction({ assignmentId, workerId, nextStation, orderId, outletId }: CompleteTransactionTypes) {
    return prisma.$transaction(async (tx) => {
      const completeAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.IN_PROGRESS },
        data: { status: WorkerAssignmentStatus.COMPLETED, completedAt: new Date() },
      });
      if (completeAssignment.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      const updateWorker = await tx.employee.updateMany({
        where: { id: workerId, workStatus: WorkStatus.BUSY },
        data: { workStatus: WorkStatus.AVAILABLE },
      });
      if (updateWorker.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      if (nextStation)
        await tx.workerAssignment.create({ data: { orderId, outletId, stationType: nextStation, status: WorkerAssignmentStatus.QUEUED } });
      else {
        //Bill ada di sini karena payment bisa saja berubah ketika awal pengecekan mutation.
        const bill = await tx.bill.findUnique({ where: { orderId }, select: { paymentStatus: true } });
        const paid = bill?.paymentStatus === BillPaymentStatus.PAID;
        await tx.order.update({
          where: { id: orderId },
          data: { customerStatus: paid ? CustomerStatus.READY_FOR_DELIVERY : CustomerStatus.WAITING_PAYMENT },
        });
        if (paid)
          await tx.driverAssignment.upsert({
            where: { orderId_taskType: { orderId, taskType: PickupDeliveryType.DELIVERY } },
            update: {},
            create: { orderId, outletId, taskType: PickupDeliveryType.DELIVERY, status: DriverAssignmentStatus.QUEUED },
          });
      }
      return tx.workerAssignment.findUnique({
        where: { id: assignmentId },
        select: { id: true, stationType: true, status: true, completedAt: true, order: { select: { id: true, orderCode: true } } },
      });
    });
  }

  static async findHistoryDetail({ workerId, assignmentId }: { workerId: string; assignmentId: string }) {
    return prisma.workerAssignment.findFirst({
      where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.COMPLETED },
      select: {
        id: true,
        stationType: true,
        assignedAt: true,
        startedAt: true,
        completedAt: true,

        order: {
          select: {
            orderCode: true,

            orderItems: {
              select: {
                id: true,
                quantity: true,

                laundryItem: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
