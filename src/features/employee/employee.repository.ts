import type { Prisma, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

export class EmployeeRepository {
  static async findById(id: string) {
    return await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }

  static async updateWorkStatus(employeeId: string, workStatus: WorkStatus, tx: Prisma.TransactionClient) {
    return await tx.employee.update({
      where: { id: employeeId },
      data: { workStatus },
    });
  }
}
