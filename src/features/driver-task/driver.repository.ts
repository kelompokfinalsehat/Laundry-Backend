import { DriverAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { ACTIVE_TASK_SELECT } from "./driver.select";

export class DriverRepository {
  static async findAvailableTasks(
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

  // Mencari tugas aktif driver yg sedang login
  // Tujuan mencegah claim 2 tugas, RULES satu driver satu tugas yg boleh di-claim
  static async findDriverActiveAssignment(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: { driverId, status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] } },
    });
    return activeAssignment;
  }
  //Mencari 1 assignment by id untuk proses CLAIM
  static async findAssignmentById(assignmentId: string) {
    return await prisma.driverAssignment.findUnique({
      where: { id: assignmentId },
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

  static async updateDriverWorkStatus(driverId: string, tx: Prisma.TransactionClient) {
    const driverResult = await tx.employee.updateMany({
      where: { id: driverId, workStatus: WorkStatus.AVAILABLE },
      data: { workStatus: WorkStatus.BUSY },
    });
    if (driverResult.count !== 1) {
      throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    }

    return driverResult;
  }

  static async findUpdatedAssignment(assignmentId: string, tx: Prisma.TransactionClient) {
    return await tx.driverAssignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, taskType: true, status: true, assignedAt: true },
    });
  }

  static async findActiveTaskDetail(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: {
        driverId: driverId,
        status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] },
      },
      select: ACTIVE_TASK_SELECT,
    });
    return activeAssignment;
  }
}
