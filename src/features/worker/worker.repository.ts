import { WorkerAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class WorkerRepository {
  static async countAvailable(where: Prisma.WorkerAssignmentWhereInput) {
    return prisma.workerAssignment.count({ where });
  }
  static async findAvailable(
    where: Prisma.WorkerAssignmentWhereInput,
    skip: number,
    take: number,
    sortOrder: "asc" | "desc",
  ) {
    return prisma.workerAssignment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: sortOrder },
      select: { id: true, stationType: true, createdAt: true, order: { select: { id: true, orderCode: true } } },
    });
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

  static async countHistory(where: Prisma.WorkerAssignmentWhereInput) {
    return prisma.workerAssignment.count({ where });
  }
  static async findHistory(
    where: Prisma.WorkerAssignmentWhereInput,
    skip: number,
    take: number,
    sortOrder: "asc" | "desc",
  ) {
    return prisma.workerAssignment.findMany({
      where,
      skip,
      take,
      orderBy: { completedAt: sortOrder },
      select: { id: true, stationType: true, completedAt: true, order: { select: { id: true, orderCode: true } } },
    });
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
}
