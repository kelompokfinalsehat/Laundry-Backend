import z from "zod";
import { ReportValidation } from "./report.validation";
import { PaginationMeta } from "../../types/pagination";
import { Role } from "../../../generated/prisma";

export type SalesPeriod = "DAY" | "MONTH" | "YEAR";

export type SalesQuery = z.infer<typeof ReportValidation.QUERY.getSales>;

export type SalesSummary = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalWeightKg: number;
  uniqueCustomers: number;
};

export type SalesComparison = {
  previousPeriod: {
    startDate: Date;
    endDate: Date;
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  revenueChangePercent: number | null;
  orderChangePercent: number | null;
  averageOrderValueChangePercent: number | null;
};

export type SalesTrendItem = {
  label: string;
  revenue: number;
  orders: number;
  totalWeightKg: number;
};

export type SalesBreakdownItem = {
  outletId: string;
  outletName: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  totalWeightKg: number;
  uniqueCustomers: number;
  revenueSharePercent: number;
};

export type SalesHighlight = {
  outletId: string;
  outletName: string;
  revenue: number;
  orders: number;
} | null;

export type SalesReport = {
  period: {
    type: SalesPeriod;
    startDate: Date;
    endDate: Date;
  };
  summary: SalesSummary;
  comparison: SalesComparison;
  trend: SalesTrendItem[];
  breakdown: SalesBreakdownItem[];
  highlights: {
    topOutlet: SalesHighlight;
    peak: SalesTrendItem | null;
  };
};

export type EmployeePerformanceQuery = z.infer<
  typeof ReportValidation.QUERY.getEmployeePeformance
>;

export type EmployeePerformanceItem = {
  employeeId: string;
  employeeName: string;
  role: Role
  completedJobs: number;
  pickupJobs: number;
  deliveryJobs: number;
  washingJobs: number;
  ironingJobs: number;
  packingJobs: number;
  averageCompletionMinutes: number | null;
};

export type EmployeePerformanceSummary = {
  totalEmployees: number;
  totalCompletedJobs: number;
  averageJobsPerEmployee: number;
  workerCompletedJobs: number;
  driverCompletedJobs: number;
  topPerformer: {
    employeeId: string;
    employeeName: string;
    role: Role
    completedJobs: number;
  } | null;
};

export type EmployeePerformanceReport = {
  data: {
    summary: EmployeePerformanceSummary;
    data: EmployeePerformanceItem[];
  };
  meta: PaginationMeta;
};
