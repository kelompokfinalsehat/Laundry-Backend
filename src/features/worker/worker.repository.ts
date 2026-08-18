import { BypassStatus, WorkerAssignmentStatus, WorkStatus, type CustomerStatus, type Prisma, type StationType } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class WorkerRepository {
  static async findAvailablePaginated(where: Prisma.WorkerAssignmentWhereInput, skip: number, take: number, sortOrder: "asc" | "desc") {
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

  static async findPreClaimDetail(assignmentId: string, workerOutletId: string) {
    return prisma.workerAssignment.findFirst({
      where: { id: assignmentId, outletId: workerOutletId, status: WorkerAssignmentStatus.QUEUED, workerId: null },
      select: {
        id: true,
        stationType: true,
        status: true,
        createdAt: true,
        order: { select: { id: true, orderCode: true } },
      },
    });
  }

  static async findHistoryPaginated(where: Prisma.WorkerAssignmentWhereInput, skip: number, take: number, sortOrder: "asc" | "desc") {
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

  static async findActiveAssignment(workerId: string) {
    return prisma.workerAssignment.findFirst({
      where: {
        workerId: workerId,
        status: { notIn: [WorkerAssignmentStatus.QUEUED, WorkerAssignmentStatus.COMPLETED] },
      },
    });
  }

  static async claimAssignment(assignmentId: string, workerId: string, workerOutletId: string) {
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
        select: {
          id: true,
          stationType: true,
          status: true,
          assignedAt: true,
          order: { select: { id: true, orderCode: true } },
        },
      });
    });
  }

  static async findActiveAssignmentDetail(workerId: string) {
    return prisma.workerAssignment.findFirst({
      where: {
        workerId: workerId,
        status: {
          in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS],
        },
      },
      select: {
        id: true,
        stationType: true,
        status: true,
        assignedAt: true,
        startedAt: true,
        order: {
          select: {
            id: true,
            orderCode: true,
            orderItems: { select: { id: true, laundryItem: { select: { id: true, name: true } } } },
          },
        },
      },
    });
  }
  static async findValidatableAssignment(workerId: string, assignmentId: string) {
    return prisma.workerAssignment.findFirst({
      where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED },
      select: {
        id: true,
        stationType: true,
        order: {
          select: {
            id: true,
            orderItems: { select: { id: true, quantity: true } }, //tidak butuh landryname (seperti di /active), butuh orderItemsId dan quantity untuk perbandingan!
          },
        },
      },
    });
  }
  static async updateValidateTransaction(workerId: string, assignmentId: string, orderId: string, customerStatus: CustomerStatus) {
    return prisma.$transaction(async (tx) => {
      const updatedAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED },
        data: {
          startedAt: new Date(),
          status: WorkerAssignmentStatus.IN_PROGRESS,
        },
      });
      if (updatedAssignment.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      await tx.order.update({
        where: { id: orderId },
        data: { customerStatus: customerStatus },
      });
      return tx.workerAssignment.findFirst({
        where: { id: assignmentId },
        select: {
          id: true,
          status: true,
          stationType: true,
          startedAt: true,
          order: { select: { id: true, orderCode: true } },
        },
      });
    });
  }

  static async createBypassTransaction({
    assignmentId,
    workerId,
    orderId,
    stationType,
    differences,
  }: {
    assignmentId: string;
    workerId: string;
    orderId: string;
    stationType: StationType;
    differences: { orderItemId: string; officialQuantity: number; submittedQuantity: number; difference: number }[];
  }) {
    return prisma.$transaction(async (tx) => {
      const updateAssignment = await tx.workerAssignment.updateMany({
        where: { id: assignmentId, workerId: workerId, status: WorkerAssignmentStatus.ASSIGNED },
        data: { status: WorkerAssignmentStatus.ON_HOLD_BYPASS },
      });
      if (updateAssignment.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      await tx.bypassRequest.create({
        data: { orderId: orderId, workerAssignmentId: assignmentId, stationType, requestedBy: workerId, quantityDiffJson: JSON.stringify({ items: differences }), status: BypassStatus.PENDING },
      });
      return tx.workerAssignment.findFirst({
        where: { id: assignmentId, status: WorkerAssignmentStatus.ON_HOLD_BYPASS },
        select: { id: true, status: true, stationType: true, startedAt: true, order: { select: { id: true, orderCode: true } } },
      });
    });
  }
}
export type WorkerActiveAssignmentDetail = NonNullable<Awaited<ReturnType<typeof WorkerRepository.findActiveAssignmentDetail>>>;
export type WorkerValidateQuantitiesDetail = NonNullable<Awaited<ReturnType<typeof WorkerRepository.findValidatableAssignment>>>;
