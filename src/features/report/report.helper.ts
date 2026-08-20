import { Prisma } from "../../../generated/prisma";
import {
  SalesBreakdownItem,
  SalesQuery,
  SalesSummary,
  SalesTrendItem,
} from "./report.type";

export class ReportHelper {
  static readonly billSelect = Prisma.validator<Prisma.BillSelect>()({
    totalAmount: true,
    createdAt: true,
    order: {
      select: {
        outletId: true,
        outlet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  });
  static getPeriodRange(query: SalesQuery) {
    if (query.period === "DAY") {
      const startDate = new Date(query.date!);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      return {
        startDate,
        endDate,
      };
    }
    if (query.period === "MONTH") {
      const startDate = new Date(query.year!, query.month! - 1);
      const endDate = new Date(query.year!, query.month!);
      return {
        startDate,
        endDate,
      };
    }

    const startDate = new Date(query.year!, 0, 1);
    const endDate = new Date(query.year! + 1, 0, 1);
    return {
      startDate,
      endDate,
    };
  }
  static buildSummary(
    bills: { totalAmount: Prisma.Decimal | null }[],
  ): SalesSummary {
    const totalRevenue = bills.reduce(
      (total, bill) => total + Number(bill.totalAmount ?? 0),
      0,
    );
    const totalOrders = bills.length;
    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    };
  }
  static buildTrend(
    bills: { totalAmount: Prisma.Decimal | null; createdAt: Date }[],
    period: SalesQuery["period"],
    startDate: Date,
    endDate: Date,
  ): SalesTrendItem[] {
    const buckets = new Map<string, SalesTrendItem>();
    const current = new Date(startDate);
    while (current < endDate) {
      const label = this.getBucketLabel(current, period);
      buckets.set(label, { label, revenue: 0, orders: 0 });
      this.moveToNextBucket(current, period);
    }
    for (const bill of bills) {
      const label = this.getBucketLabel(bill.createdAt, period);
      const bucket = buckets.get(label);
      if (!bucket) continue;
      bucket.revenue += Number(bill.totalAmount ?? 0);
      bucket.orders += 1;
    }
    return Array.from(buckets.values());
  }
  static buildBreakdown(
    bills: {
      totalAmount: Prisma.Decimal | null;
      order: { outletId: string; outlet: { id: string; name: string } };
    }[],
  ): SalesBreakdownItem[] {
    const breakdown = new Map<string, SalesBreakdownItem>();
    for (const bill of bills) {
      const outlet = bill.order.outlet;
      const existing = breakdown.get(outlet.id);
      const revenue = Number(bill.totalAmount ?? 0);
      if (existing) {
        existing.revenue += revenue;
        existing.orders += 1;
        continue;
      }
      breakdown.set(outlet.id, {
        outletId: outlet.id,
        outletName: outlet.name,
        revenue,
        orders: 1,
      });
    }
    return Array.from(breakdown.values()).sort((a, b) => b.revenue - a.revenue);
  }
  private static getBucketLabel(
    date: Date,
    period: SalesQuery["period"],
  ): string {
    switch (period) {
      case "DAY":
        return `${date.getHours().toString().padStart(2, "0")}:00`;
      case "MONTH":
        return date.getDate().toString().padStart(2, "0");
      default:
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    }
  }
  private static moveToNextBucket(date: Date, period: SalesQuery["period"]) {
    switch (period) {
      case "DAY":
        date.setHours(date.getHours() + 1);
        return;
      case "MONTH":
        date.setDate(date.getDate() + 1);
        return;
      default:
        date.setMonth(date.getMonth() + 1);
    }
  }
}
