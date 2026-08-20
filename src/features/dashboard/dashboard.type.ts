import z from "zod";
import { DashboardValidation } from "./dashboard.validation";

export type DashboardQuery = z.infer<typeof DashboardValidation.QUERY.getDashboard>
export type DashboardActionItem = {
  id: string;
  orderNumber: string;
  customerName: string;
  createdAt: Date;
};
export type PendingBypassItem = {
  id: string;
  orderId: string;
  orderNumber: string;
  workerName: string;
  stationType: string;
  createdAt: Date;
};
export type DashboardSummary = {
  totalOrders: number;
  activeOrders: number;
  totalRevenue: number;
  completedOrders: number;
};
export type RevenueTrendItem = {
  date: string;
  revenue: number;
};
export type OrderOverviewItem = {
  status: string;
  total: number;
};
export type RecentOrderItem = {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  createdAt: Date;
};
export type DashboardResponse = {
  actionRequired: {
    pendingReceive: {
      total: number;
      items: DashboardActionItem[];
    };
    pendingBypass: {
      total: number;
      items: PendingBypassItem[];
    };
  };

  summary: DashboardSummary;

  revenueTrend: RevenueTrendItem[];

  orderOverview: OrderOverviewItem[];

  recentOrders: RecentOrderItem[];
};