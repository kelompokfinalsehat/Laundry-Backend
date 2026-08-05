import { prisma } from "../../configs/prisma-client.config";

export class EmployeeRepository {
  static async findActiveById(id: string) {
    return await prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
