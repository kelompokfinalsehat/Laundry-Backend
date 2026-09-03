import { Prisma } from "../../../generated/prisma";
import {
  SalesBreakdownItem,
  SalesPeriod,
  SalesQuery,
  SalesSummary,
  SalesTrendItem,
} from "./report.type";

type BillReportRow = {
  totalAmount: Prisma.Decimal;
  weightKg: Prisma.Decimal;
  paidAt: Date | null;
  order: {
    customerId: string;
    outletId: string;
    outlet: {
      id: string;
      name: string;
    };
  };
};

export class ReportHelper {
  static readonly billSelect = Prisma.validator<Prisma.BillSelect>()({
    totalAmount: true,
    weightKg: true,
    paidAt: true,
    order: {
      select: {
        customerId: true,
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
      const source = query.date ?? new Date();
      const startDate = new Date(
        source.getFullYear(),
        source.getMonth(),
        source.getDate(),
      );
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      return { startDate, endDate };
    }

    if (query.period === "MONTH") {
      const now = new Date();
      const year = query.year ?? now.getFullYear();
      const month = query.month ?? now.getMonth() + 1;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      return { startDate, endDate };
    }

    const year = query.year ?? new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    return { startDate, endDate };
  }

  static getPreviousPeriodRange(period: SalesPeriod, startDate: Date) {
    if (period === "DAY") {
      const previousEndDate = new Date(startDate);
      const previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 1);

      return { startDate: previousStartDate, endDate: previousEndDate };
    }

    if (period === "MONTH") {
      const previousStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() - 1,
        1,
      );
      const previousEndDate = new Date(startDate);

      return { startDate: previousStartDate, endDate: previousEndDate };
    }

    const previousStartDate = new Date(startDate.getFullYear() - 1, 0, 1);
    const previousEndDate = new Date(startDate);

    return { startDate: previousStartDate, endDate: previousEndDate };
  }

  static buildSummary(bills: BillReportRow[]): SalesSummary {
    const totalRevenue = bills.reduce(
      (total, bill) => total + Number(bill.totalAmount),
      0,
    );

    const totalWeightKg = bills.reduce(
      (total, bill) => total + Number(bill.weightKg),
      0,
    );

    const totalOrders = bills.length;
    const uniqueCustomers = new Set(bills.map((bill) => bill.order.customerId))
      .size;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      totalWeightKg,
      uniqueCustomers,
    };
  }

  static buildTrend(
    bills: BillReportRow[],
    period: SalesPeriod,
    startDate: Date,
    endDate: Date,
  ): SalesTrendItem[] {
    const buckets = new Map<string, SalesTrendItem>();
    const current = new Date(startDate);

    while (current < endDate) {
      const label = this.getBucketLabel(current, period);

      buckets.set(label, {
        label,
        revenue: 0,
        orders: 0,
        totalWeightKg: 0,
      });

      this.moveToNextBucket(current, period);
    }

    for (const bill of bills) {
      if (!bill.paidAt) continue;

      const label = this.getBucketLabel(bill.paidAt, period);
      const bucket = buckets.get(label);

      if (!bucket) continue;

      bucket.revenue += Number(bill.totalAmount);
      bucket.orders += 1;
      bucket.totalWeightKg += Number(bill.weightKg);
    }

    return Array.from(buckets.values());
  }

  static buildBreakdown(
    bills: BillReportRow[],
    totalRevenue: number,
  ): SalesBreakdownItem[] {
    const breakdown = new Map<
      string,
      SalesBreakdownItem & { customerIds: Set<string> }
    >();

    for (const bill of bills) {
      const outlet = bill.order.outlet;
      const revenue = Number(bill.totalAmount);
      const weight = Number(bill.weightKg);

      const existing = breakdown.get(outlet.id);

      if (existing) {
        existing.revenue += revenue;
        existing.orders += 1;
        existing.totalWeightKg += weight;
        existing.customerIds.add(bill.order.customerId);
        continue;
      }

      breakdown.set(outlet.id, {
        outletId: outlet.id,
        outletName: outlet.name,
        revenue,
        orders: 1,
        averageOrderValue: 0,
        totalWeightKg: weight,
        uniqueCustomers: 0,
        revenueSharePercent: 0,
        customerIds: new Set([bill.order.customerId]),
      });
    }

    return Array.from(breakdown.values())
      .map(({ customerIds, ...item }) => ({
        ...item,
        averageOrderValue: item.orders > 0 ? item.revenue / item.orders : 0,
        uniqueCustomers: customerIds.size,
        revenueSharePercent:
          totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }

  static getPercentChange(current: number, previous: number): number | null {
    if (previous === 0) {
      return current === 0 ? 0 : null;
    }

    return ((current - previous) / previous) * 100;
  }

  private static getBucketLabel(date: Date, period: SalesPeriod): string {
    switch (period) {
      case "DAY":
        return `${date.getHours().toString().padStart(2, "0")}:00`;

      case "MONTH":
        return date.getDate().toString().padStart(2, "0");

      case "YEAR":
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
    }
  }

  private static moveToNextBucket(date: Date, period: SalesPeriod) {
    switch (period) {
      case "DAY":
        date.setHours(date.getHours() + 1);
        return;

      case "MONTH":
        date.setDate(date.getDate() + 1);
        return;

      case "YEAR":
        date.setMonth(date.getMonth() + 1);
    }
  }
}
