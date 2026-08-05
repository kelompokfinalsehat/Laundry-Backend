import { Prisma, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

export class AttendanceRepository {
  static async isClockInAlready(employeeId: string, attendanceDate: Date) {
    return await prisma.attendance.findFirst({
      where: { employeeId, attendanceDate },
    });
  }
  static async create(
    data: {
      employeeId: string;
      outletId: string;
      attendanceDate: Date;
      clockInAt: Date;
    },
    tx: Prisma.TransactionClient,
  ) {
    const newAttendance = await tx.attendance.create({
      data,
    });

    return newAttendance;
  }

  static async updateEmployeeWorkStatus(
    employeeId: string,
    workStatus: WorkStatus,
    tx: Prisma.TransactionClient,
  ) {
    const updateEmployee = await tx.employee.update({
      where: { id: employeeId },
      data: { workStatus },
    });
    return updateEmployee;
  }
}
