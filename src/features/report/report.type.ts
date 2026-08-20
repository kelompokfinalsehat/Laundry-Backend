import z from "zod";
import { ReportValidation } from "./report.validation";
import { PaginationMeta } from "../../types/pagination";

export type SalesPeriod = "DAY" | "MONTH" | "YEAR";
export type SalesQuery = z.infer<typeof ReportValidation.QUERY.getSales>;
export type SalesSummary = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
};
export type SalesTrendItem = {
  label: string;
  revenue: number;
  orders: number;
};
export type SalesBreakdownItem = {
  outletId: string;
  outletName: string;
  revenue: number;
  orders: number;
};
export type SalesReport = {
  period: {
    type: SalesPeriod;
    startDate: Date;
    endDate: Date;
  };

  summary: SalesSummary;

  trend: SalesTrendItem[];

  breakdown: SalesBreakdownItem[];
};
export type EmployeePerformanceQuery = z.infer<
  typeof ReportValidation.QUERY.getEmployeePeformance
>;
export type EmployeePerformanceItem = {
  employeeId: string;
  employeeName: string;
  role: string;
  completedJobs: number;
};
export type EmployeePerformanceReport = {
    data: {
        summary: {
          totalEmployees: number;
          totalCompletedJobs: number;
        };
        data: EmployeePerformanceItem[];
    }
  meta: PaginationMeta;
};
