import { DriverAssignmentStatus, Prisma, Role, WorkerAssignmentStatus, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

export class AttendanceRepository {
  static async findTodayAttendance(employeeId: string, attendanceDate: Date) {
    return await prisma.attendance.findFirst({
      where: { employeeId, attendanceDate },
    });
  }

  static async findOpenAttendance(employeeId: string) {
    return await prisma.attendance.findFirst({
      where: { employeeId, clockInAt: { not: null }, clockOutAt: null },
      orderBy: [{ attendanceDate: "desc" }, { createdAt: "desc" }],
    });
  }

  static async createAttendance(
    data: {
      employeeId: string;
      outletId: string;
      attendanceDate: Date;
      clockInAt?: Date;
    },
    tx: Prisma.TransactionClient,
  ) {
    const newAttendance = await tx.attendance.create({
      data,
    });

    return newAttendance;
  }

  static async findEmployeeActiveAssigment(employeeId: string, role: Role) {
    if (role === Role.DRIVER) {
      return await prisma.driverAssignment.findFirst({
        where: {
          driverId: employeeId,
          status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] },
        },
      });
    } else if (role === Role.WORKER) {
      return await prisma.workerAssignment.findFirst({
        where: {
          workerId: employeeId,
          status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS] },
        },
      });
    } else {
      return null;
    }
  }

  static async closeAttendance(attendanceId: string, clockOutAt: Date, tx: Prisma.TransactionClient) {
    return await tx.attendance.update({
      where: { id: attendanceId },
      data: { clockOutAt: clockOutAt },
    });
  }
}
