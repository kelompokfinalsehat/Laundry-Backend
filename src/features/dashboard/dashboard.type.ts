import z from "zod";
import {
  CustomerStatus,
  StationType,
} from "../../../generated/prisma";
import { DashboardValidation } from "./dashboard.validation";

export type DashboardQuery = z.infer<typeof DashboardValidation.QUERY.getDashboard>

export interface DashboardSummary {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  outletName?: string
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
}

export interface OrderOverviewItem {
  status: CustomerStatus;
  total: number;
}

export interface RecentOrderItem {
  id: string;
  orderCode: string;
  customerName: string;
  status: CustomerStatus;
  createdAt: Date;
}

export interface PendingReceiveItem {
  id: string;
  orderCode: string;
  customerName: string;
  createdAt: Date;
}

export interface PendingBypassItem {
  id: string;
  orderId: string;
  orderCode: string;
  workerName: string;
  stationType: StationType;
  createdAt: Date;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  revenueTrend: RevenueTrendItem[];
  orderOverview: OrderOverviewItem[];
  recentOrders: RecentOrderItem[];

  pendingReceive: {
    total: number;
    items: PendingReceiveItem[];
  };

  pendingBypass: {
    total: number;
    items: PendingBypassItem[];
  };
}