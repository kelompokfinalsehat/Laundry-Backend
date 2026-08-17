import { WorkerAssignmentStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

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
}
