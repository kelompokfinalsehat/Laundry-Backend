import { DriverAssignmentStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { EmployeeRepository } from "../attendance/employee.repository";
import { DriverChecker } from "./driver.checker";
import type { DriverAvailableTaskInput } from "./driver.validation";

export class DriverService {
  static async getAvailableTasks({ payload, query }: { payload: { id: string } } & DriverAvailableTaskInput) {
    const driver = await EmployeeRepository.findActiveById(payload.id);
    DriverChecker.verifyDriver(driver);

    const where: Prisma.DriverAssignmentWhereInput = {
      outletId: driver.currentOutletId!,
      status: DriverAssignmentStatus.QUEUED,
    };
    if (query.taskType) {
      where.taskType = query.taskType;
    }

    const totalItems = await prisma.driverAssignment.count({ where });

    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;
    const availableTask = await prisma.driverAssignment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: query.sortOrder },
      select: {
        id: true,
        taskType: true,
        createdAt: true,
        order: {
          select: {
            id: true,
            orderCode: true,
          },
        },
      },
    });

    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });
    return { availableTask, meta };
  }
}
