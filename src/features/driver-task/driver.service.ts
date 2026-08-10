import { DriverAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { ResponseError } from "../../utils/response-error.utils";
import { EmployeeRepository } from "../attendance/employee.repository";
import { DriverChecker } from "./driver.checker";
import { DriverRepository } from "./driver.repository";
import type { DriverAvailableTaskInput, DriverClaimInput } from "./driver.validation";

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
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;

    const [totalItems, availableTask] = await Promise.all([
      prisma.driverAssignment.count({ where }),
      DriverRepository.findAvailableTasks(where, skip, take, query.sortOrder),
    ]);
    // const totalItems = await prisma.driverAssignment.count({ where });

    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });
    return { availableTask, meta };
  }
  static async claimAssignment({ payload, params, body }: { payload: { id: string } } & DriverClaimInput) {
    const driver = await EmployeeRepository.findActiveById(payload.id);
    DriverChecker.verifyDriver(driver);
    DriverChecker.verifyWorkStatus(driver, WorkStatus.AVAILABLE);

    const driverActiveAssignment = await DriverRepository.findDriverActiveAssignment(driver.id);
    if (driverActiveAssignment) {
      throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");
    }
    const assignment = await DriverRepository.findAssignmentById(params.assignmentId);
    DriverChecker.verifyAssignmentToClaim(assignment, driver.currentOutletId!);

    const claimAssignment = await prisma.$transaction(async (tx) => {
      const assignedAt = new Date();
      await DriverRepository.ClaimAssignment(assignment.id, driver.currentOutletId!, driver.id, assignedAt, tx);
      await DriverRepository.updateDriverWorkStatus(driver.id, tx);
      const updatedAssignment = await DriverRepository.findUpdatedAssignment(assignment.id, tx);
      return updatedAssignment;
    });

    return claimAssignment;
  }
}
