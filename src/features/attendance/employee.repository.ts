import type { Prisma, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

export class EmployeeRepository {
  static async findById(id: string) {
    return await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
