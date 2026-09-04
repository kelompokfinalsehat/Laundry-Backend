import {
  BillPaymentStatus,
  DriverAssignmentStatus,
  PickupDeliveryType,
  Prisma,
  Role,
  StationType,
  WorkerAssignmentStatus,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ReportHelper } from "./report.helper";
import {
  EmployeePerformanceItem,
  EmployeePerformanceQuery,
  EmployeePerformanceReport,
  SalesQuery,
  SalesReport,
} from "./report.type";

type EmployeeAccumulator = EmployeePerformanceItem & {
  completionDurations: number[];
};

export class ReportRepository {
  static async getSalesReport(
    query: SalesQuery,
    scopedOutletId?: string,
  ): Promise<SalesReport> {
    const { startDate, endDate } = ReportHelper.getPeriodRange(query);

    const previousPeriod = ReportHelper.getPreviousPeriodRange(
      query.period,
      startDate,
    );

    const outletId = scopedOutletId ?? query.outletId;

    const buildWhere = (
      rangeStart: Date,
      rangeEnd: Date,
    ): Prisma.BillWhereInput => ({
      paymentStatus: BillPaymentStatus.PAID,
      paidAt: {
        gte: rangeStart,
        lt: rangeEnd,
      },
      ...(outletId && {
        order: {
          outletId,
        },
      }),
    });

    const [bills, previousBills] = await Promise.all([
      prisma.bill.findMany({
        where: buildWhere(startDate, endDate),
        select: ReportHelper.billSelect,
        orderBy: {
          paidAt: "asc",
        },
      }),

      prisma.bill.findMany({
        where: buildWhere(previousPeriod.startDate, previousPeriod.endDate),
        select: ReportHelper.billSelect,
      }),
    ]);

    const summary = ReportHelper.buildSummary(bills);

    const previousSummary = ReportHelper.buildSummary(previousBills);

    const trend = ReportHelper.buildTrend(
      bills,
      query.period,
      startDate,
      endDate,
    );

    const breakdown = ReportHelper.buildBreakdown(bills, summary.totalRevenue);

    const peak = trend.reduce<(typeof trend)[number] | null>(
      (highest, item) =>
        !highest || item.revenue > highest.revenue ? item : highest,
      null,
    );

    return {
      period: {
        type: query.period,
        startDate,
        endDate,
      },

      summary,

      comparison: {
        previousPeriod: {
          startDate: previousPeriod.startDate,
          endDate: previousPeriod.endDate,
          totalRevenue: previousSummary.totalRevenue,
          totalOrders: previousSummary.totalOrders,
          averageOrderValue: previousSummary.averageOrderValue,
        },

        revenueChangePercent: ReportHelper.getPercentChange(
          summary.totalRevenue,
          previousSummary.totalRevenue,
        ),

        orderChangePercent: ReportHelper.getPercentChange(
          summary.totalOrders,
          previousSummary.totalOrders,
        ),

        averageOrderValueChangePercent: ReportHelper.getPercentChange(
          summary.averageOrderValue,
          previousSummary.averageOrderValue,
        ),
      },

      trend,

      breakdown,

      highlights: {
        topOutlet: breakdown[0]
          ? {
              outletId: breakdown[0].outletId,
              outletName: breakdown[0].outletName,
              revenue: breakdown[0].revenue,
              orders: breakdown[0].orders,
            }
          : null,

        peak,
      },
    };
  }

  static async getEmployeePerformanceReport(
    query: EmployeePerformanceQuery,
    scopedOutletId?: string,
  ): Promise<EmployeePerformanceReport> {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);

    const outletId = scopedOutletId ?? query.outletId;

    const dateRange = this.getCompletedAtRange(query.startDate, query.endDate);

    const shouldQueryWorker = !query.role || query.role === Role.WORKER;

    const shouldQueryDriver = !query.role || query.role === Role.DRIVER;

    const workerWhere: Prisma.WorkerAssignmentWhereInput = {
      status: WorkerAssignmentStatus.COMPLETED,

      completedAt: {
        not: null,
        ...dateRange,
      },

      ...(outletId && {
        outletId,
      }),

      ...(query.stationType && {
        stationType: query.stationType,
      }),

      workerId: {
        not: null,
      },
    };

    const driverWhere: Prisma.DriverAssignmentWhereInput = {
      status: DriverAssignmentStatus.COMPLETED,

      completedAt: {
        not: null,
        ...dateRange,
      },

      ...(outletId && {
        outletId,
      }),

      driverId: {
        not: null,
      },
    };

    const [workerAssignments, driverAssignments] = await Promise.all([
      shouldQueryWorker
        ? prisma.workerAssignment.findMany({
            where: workerWhere,
            select: {
              workerId: true,
              stationType: true,
              startedAt: true,
              completedAt: true,
            },
          })
        : Promise.resolve([]),

      shouldQueryDriver && !query.stationType
        ? prisma.driverAssignment.findMany({
            where: driverWhere,
            select: {
              driverId: true,
              taskType: true,
              assignedAt: true,
              completedAt: true,
            },
          })
        : Promise.resolve([]),
    ]);

    const performanceMap = new Map<string, EmployeeAccumulator>();

    const getAccumulator = (employeeId: string, role: Role) => {
      const existing = performanceMap.get(employeeId);

      if (existing) {
        return existing;
      }

      const created: EmployeeAccumulator = {
        employeeId,
        employeeName: "",
        role,
        completedJobs: 0,
        pickupJobs: 0,
        deliveryJobs: 0,
        washingJobs: 0,
        ironingJobs: 0,
        packingJobs: 0,
        averageCompletionMinutes: null,
        completionDurations: [],
      };

      performanceMap.set(employeeId, created);

      return created;
    };

    for (const assignment of workerAssignments) {
      if (!assignment.workerId) continue;

      const item = getAccumulator(assignment.workerId, Role.WORKER);

      item.completedJobs += 1;

      if (assignment.stationType === StationType.WASHING) {
        item.washingJobs += 1;
      }

      if (assignment.stationType === StationType.IRONING) {
        item.ironingJobs += 1;
      }

      if (assignment.stationType === StationType.PACKING) {
        item.packingJobs += 1;
      }

      const duration = this.getDurationMinutes(
        assignment.startedAt,
        assignment.completedAt,
      );

      if (duration !== null) {
        item.completionDurations.push(duration);
      }
    }

    for (const assignment of driverAssignments) {
      if (!assignment.driverId) continue;

      const item = getAccumulator(assignment.driverId, Role.DRIVER);

      item.completedJobs += 1;

      if (assignment.taskType === PickupDeliveryType.PICKUP) {
        item.pickupJobs += 1;
      }

      if (assignment.taskType === PickupDeliveryType.DELIVERY) {
        item.deliveryJobs += 1;
      }

      const duration = this.getDurationMinutes(
        assignment.assignedAt,
        assignment.completedAt,
      );

      if (duration !== null) {
        item.completionDurations.push(duration);
      }
    }

    const employeeIds = [...performanceMap.keys()];

    if (employeeIds.length === 0) {
      return this.emptyEmployeePerformanceReport(page, pageSize);
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

    const performance = employees
      .filter(
        (employee) =>
          employee.role === Role.DRIVER || employee.role === Role.WORKER,
      )
      .map((employee) => {
        const item = performanceMap.get(employee.id);

        if (!item) {
          throw new Error("Employee performance data is missing.");
        }

        const averageCompletionMinutes =
          item.completionDurations.length > 0
            ? item.completionDurations.reduce(
                (total, duration) => total + duration,
                0,
              ) / item.completionDurations.length
            : null;

        const { completionDurations, ...employeePerformance } = item;

        return {
          ...employeePerformance,
          employeeName: employee.name,
          role: employee.role,
          averageCompletionMinutes,
        };
      });

    this.sortPerformance(performance, query);

    const totalItems = performance.length;

    const totalCompletedJobs = performance.reduce(
      (total, employee) => total + employee.completedJobs,
      0,
    );

    const workerCompletedJobs = performance
      .filter((employee) => employee.role === Role.WORKER)
      .reduce((total, employee) => total + employee.completedJobs, 0);

    const driverCompletedJobs = performance
      .filter((employee) => employee.role === Role.DRIVER)
      .reduce((total, employee) => total + employee.completedJobs, 0);

    const topPerformer =
      [...performance].sort((a, b) => b.completedJobs - a.completedJobs)[0] ??
      null;

    const data = performance.slice(skip, skip + take);

    return {
      data: {
        summary: {
          totalEmployees: totalItems,

          totalCompletedJobs,

          averageJobsPerEmployee:
            totalItems > 0 ? totalCompletedJobs / totalItems : 0,

          workerCompletedJobs,

          driverCompletedJobs,

          topPerformer: topPerformer
            ? {
                employeeId: topPerformer.employeeId,
                employeeName: topPerformer.employeeName,
                role: topPerformer.role,
                completedJobs: topPerformer.completedJobs,
              }
            : null,
        },

        data,
      },

      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }

  private static getCompletedAtRange(
    startDate?: Date,
    endDate?: Date,
  ): Pick<Prisma.DateTimeNullableFilter, "gte" | "lt"> {
    const range: Pick<Prisma.DateTimeNullableFilter, "gte" | "lt"> = {};

    if (startDate) {
      range.gte = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      );
    }

    if (endDate) {
      const exclusiveEndDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
      );

      exclusiveEndDate.setDate(exclusiveEndDate.getDate() + 1);

      range.lt = exclusiveEndDate;
    }

    return range;
  }

  private static getDurationMinutes(
    startedAt: Date | null,
    completedAt: Date | null,
  ): number | null {
    if (!startedAt || !completedAt || completedAt <= startedAt) {
      return null;
    }

    return (completedAt.getTime() - startedAt.getTime()) / 60_000;
  }

  private static sortPerformance(
    performance: EmployeePerformanceItem[],
    query: EmployeePerformanceQuery,
  ) {
    performance.sort((a, b) => {
      if (query.sortBy === "name") {
        const comparison = a.employeeName.localeCompare(b.employeeName);

        return query.sortOrder === "asc" ? comparison : -comparison;
      }

      const comparison = a.completedJobs - b.completedJobs;

      return query.sortOrder === "asc" ? comparison : -comparison;
    });
  }

  private static emptyEmployeePerformanceReport(
    page: number,
    pageSize: number,
  ): EmployeePerformanceReport {
    return {
      data: {
        summary: {
          totalEmployees: 0,
          totalCompletedJobs: 0,
          averageJobsPerEmployee: 0,
          workerCompletedJobs: 0,
          driverCompletedJobs: 0,
          topPerformer: null,
        },

        data: [],
      },

      meta: PaginationHelper.meta(page, pageSize, 0),
    };
  }
}
