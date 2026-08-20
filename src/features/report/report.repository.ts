import {
  BillPaymentStatus,
  DriverAssignmentStatus,
  Prisma,
  WorkerAssignmentStatus,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ReportHelper } from "./report.helper";
import {
  EmployeePerformanceQuery,
  EmployeePerformanceReport,
  SalesQuery,
  SalesReport,
} from "./report.type";

export class ReportRepository {
  static async getSalesReport(
    query: SalesQuery,
    scopedOutletId?: string,
  ): Promise<SalesReport> {
    const { startDate, endDate } = ReportHelper.getPeriodRange(query);
    const outletId = scopedOutletId ?? query.outletId;
    const where: Prisma.BillWhereInput = {
      paymentStatus: BillPaymentStatus.PAID,
      paidAt: {
        gte: startDate,
        lt: endDate,
      },
      ...(outletId && { order: { outletId } }),
    };
    const bills = await prisma.bill.findMany({
      where,
      select: ReportHelper.billSelect,
      orderBy: { paidAt: "asc" },
    });
    const summary = ReportHelper.buildSummary(bills);
    const trend = ReportHelper.buildTrend(
      bills,
      query.period,
      startDate,
      endDate,
    );
    const breakdown = ReportHelper.buildBreakdown(bills);
    return {
      period: {
        type: query.period,
        startDate,
        endDate,
      },
      summary,
      trend,
      breakdown,
    };
  }
  static async getEmployeePerformanceReport(
    query: EmployeePerformanceQuery,
    scopedOutletId?: string,
  ): Promise<EmployeePerformanceReport> {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);

    const outletId = scopedOutletId ?? query.outletId;

    const completedAt: Prisma.DateTimeNullableFilter = {
      not: null,
      ...(query.startDate && {
        gte: query.startDate,
      }),
      ...(query.endDate && {
        lt: query.endDate,
      }),
    };

    const workerWhere: Prisma.WorkerAssignmentWhereInput = {
      status: WorkerAssignmentStatus.COMPLETED,
      completedAt,
      ...(outletId && { outletId }),
      ...(query.stationType && {
        stationType: query.stationType,
      }),
    };

    const driverWhere: Prisma.DriverAssignmentWhereInput = {
      status: DriverAssignmentStatus.COMPLETED,
      completedAt,
      ...(outletId && { outletId }),
    };

    const shouldQueryWorker = !query.role || query.role === "WORKER";

    const shouldQueryDriver = !query.role || query.role === "DRIVER";

    const [workerPerformance, driverPerformance] = await Promise.all([
      shouldQueryWorker
        ? prisma.workerAssignment.groupBy({
            by: ["workerId"],
            where: {
              ...workerWhere,
              workerId: { not: null },
            },
            _count: {
              id: true,
            },
          })
        : Promise.resolve([]),

      shouldQueryDriver && !query.stationType
        ? prisma.driverAssignment.groupBy({
            by: ["driverId"],
            where: {
              ...driverWhere,
              driverId: { not: null },
            },
            _count: {
              id: true,
            },
          })
        : Promise.resolve([]),
    ]);

    const performanceMap = new Map<string, number>();

    for (const item of workerPerformance) {
      if (!item.workerId) continue;

      performanceMap.set(item.workerId, item._count.id);
    }

    for (const item of driverPerformance) {
      if (!item.driverId) continue;

      performanceMap.set(
        item.driverId,
        (performanceMap.get(item.driverId) ?? 0) + item._count.id,
      );
    }

    const employeeIds = [...performanceMap.keys()];

    if (employeeIds.length === 0) {
      return {
        data: {
          summary: {
            totalEmployees: 0,
            totalCompletedJobs: 0,
          },
          data: [],
        },
        meta: PaginationHelper.meta(page, pageSize, 0),
      };
    }

    const employees = await prisma.employee.findMany({
      where: {
        id: {
          in: employeeIds,
        },

        ...(query.search && {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        }),
      },

      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    const performance = employees.map((employee) => ({
      employeeId: employee.id,
      employeeName: employee.name,
      role: employee.role,
      completedJobs: performanceMap.get(employee.id) ?? 0,
    }));

    const totalCompletedJobs = performance.reduce(
      (total, employee) => total + employee.completedJobs,
      0,
    );

    performance.sort((a, b) => {
      if (query.sortBy === "name") {
        const comparison = a.employeeName.localeCompare(b.employeeName);

        return query.sortOrder === "asc" ? comparison : -comparison;
      }

      const comparison = a.completedJobs - b.completedJobs;

      return query.sortOrder === "asc" ? comparison : -comparison;
    });

    const totalItems = performance.length;

    const data = performance.slice(skip, skip + take);

    return {
      data: {
        summary: {
          totalEmployees: totalItems,
          totalCompletedJobs,
        },
        data,
      },
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
}
