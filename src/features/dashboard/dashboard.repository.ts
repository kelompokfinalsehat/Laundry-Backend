import {
  BillPaymentStatus,
  BypassStatus,
  CustomerStatus,
  Prisma,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { DashboardQuery, DashboardResponse } from "./dashboard.type";

export class DashboardRepository {
  private static readonly PendingOrderSelect =
    Prisma.validator<Prisma.OrderSelect>()({
      id: true,
      orderCode: true,
      createdAt: true,
      customer: {
        select: {
          name: true,
        },
      },
    });
  private static readonly PendingBypassSelect =
    Prisma.validator<Prisma.BypassRequestSelect>()({
      id: true,
      createdAt: true,
      workerAssignment: {
        select: {
          stationType: true,
          worker: {
            select: {
              name: true,
            },
          },
          order: {
            select: {
              id: true,
              orderCode: true,
            },
          },
        },
      },
    });
  private static readonly RecentOrderSelect =
    Prisma.validator<Prisma.OrderSelect>()({
      id: true,
      orderCode: true,
      customerStatus: true,
      createdAt: true,
      customer: {
        select: {
          name: true,
        },
      },
    });
  static async getDashboard(
    query: DashboardQuery,
    scopedOutletId?: string,
  ): Promise<DashboardResponse> {
    const outletId = scopedOutletId ?? query.outletId;
    const orderWhere: Prisma.OrderWhereInput = {
      ...(outletId && { outletId }),
    };
    const billWhere: Prisma.BillWhereInput = {
      ...(outletId && { order: { outletId } }),
    };
    const pendingReceiveWhere: Prisma.OrderWhereInput = {
      customerStatus: CustomerStatus.ON_THE_WAY_TO_OUTLET,
      ...(outletId && { outletId }),
    };
    const pendingBypassWhere: Prisma.BypassRequestWhereInput = {
      status: BypassStatus.PENDING,
      ...(outletId && { workerAssignment: { outletId } }),
    };
    const activeOrdersWhere: Prisma.OrderWhereInput = {
      ...orderWhere,
      customerStatus: { not: CustomerStatus.RECEIVED_BY_CUSTOMER },
    };
    const completedOrdersWhere: Prisma.OrderWhereInput = {
      ...orderWhere,
      customerStatus: CustomerStatus.RECEIVED_BY_CUSTOMER,
    };
    const paidBillWhere: Prisma.BillWhereInput = {
      ...billWhere,
      paymentStatus: BillPaymentStatus.PAID,
    };
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
    const revenueTrendWhere: Prisma.BillWhereInput = {
      ...paidBillWhere,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    };
    const [totalPendingReceive, itemsPendingReceive] = await Promise.all([
      prisma.order.count({
        where: pendingReceiveWhere,
      }),
      prisma.order.findMany({
        where: pendingReceiveWhere,
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: this.PendingOrderSelect,
      }),
    ]);

    const [totalPendingBypass, itemsPendingBypass] = await Promise.all([
      prisma.bypassRequest.count({ where: pendingBypassWhere }),
      prisma.bypassRequest.findMany({
        where: pendingBypassWhere,
        take: 5,
        orderBy: { createdAt: "desc" },
        select: this.PendingBypassSelect,
      }),
    ]);
    const [totalOrders, activeOrders, completedOrders, revenueAggregate] =
      await Promise.all([
        prisma.order.count({
          where: orderWhere,
        }),

        prisma.order.count({
          where: activeOrdersWhere,
        }),

        prisma.order.count({
          where: completedOrdersWhere,
        }),

        prisma.bill.aggregate({
          where: paidBillWhere,
          _sum: {
            totalAmount: true,
          },
        }),
      ]);
    const recentOrders = await prisma.order.findMany({
      where: orderWhere,
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: this.RecentOrderSelect,
    });
    const orderOverview = await prisma.order.groupBy({
      by: ["customerStatus"],
      where: orderWhere,
      _count: {
        id: true,
      },
    });
    const revenueBills = await prisma.bill.findMany({
      where: revenueTrendWhere,
      select: {
        createdAt: true,
        totalAmount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const pendingReceive = {
      total: totalPendingReceive,
      items: itemsPendingReceive.map((order) => ({
        id: order.id,
        orderCode: order.orderCode,
        customerName: order.customer.name,
        createdAt: order.createdAt,
      })),
    };
    const pendingBypass = {
      total: totalPendingBypass,
      items: itemsPendingBypass.map((request) => ({
        id: request.id,
        orderId: request.workerAssignment.order.id,
        orderCode: request.workerAssignment.order.orderCode,
        workerName: request.workerAssignment.worker?.name ?? "-",
        stationType: request.workerAssignment.stationType,
        createdAt: request.createdAt,
      })),
    };
    const summary = {
      totalOrders,
      activeOrders,
      completedOrders,
      totalRevenue: Number(revenueAggregate._sum.totalAmount) ?? 0,
    };
    const recentOrderData = recentOrders.map((order) => ({
      id: order.id,
      orderCode: order.orderCode,
      customerName: order.customer.name,
      status: order.customerStatus,
      createdAt: order.createdAt,
    }));
    const orderOverviewData = orderOverview.map((order) => ({
      status: order.customerStatus,
      total: order._count.id,
    }));
    const revenueMap = new Map<string, number>();
    const getDateKey = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    for (const bill of revenueBills) {
      const key = getDateKey(bill.createdAt);
      revenueMap.set(
        key,
        (revenueMap.get(key) ?? 0) + Number(bill.totalAmount),
      );
    }
    const revenueTrend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);

      const key = getDateKey(date);

      return {
        date: key,
        revenue: revenueMap.get(key) ?? 0,
      };
    });
    return {
      summary,
      revenueTrend,
      orderOverview: orderOverviewData,
      recentOrders: recentOrderData,
      pendingReceive,
      pendingBypass,
    };
  }
}
