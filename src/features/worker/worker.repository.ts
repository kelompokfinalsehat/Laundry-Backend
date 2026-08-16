import type { Prisma } from "../../../generated/prisma";
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
}
