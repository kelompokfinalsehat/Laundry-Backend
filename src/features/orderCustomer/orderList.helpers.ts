import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import {
  CUSTOMER_STATUS_LABELS,
  ORDER_STATUS_GROUPS,
} from "./order.constants";
import { ListOrderInput } from "./order.validation";

type OrderListItem = Prisma.OrderGetPayload<{
  include: {
    bill: {
      select: {
        totalAmount: true;
        paymentStatus: true;
      };
    };
  };
}>;

export class OrderListHelper {
  static async getList(
    customerId: string,
    query: ListOrderInput["query"],
  ) {
    const where = this.buildWhere(
      customerId,
      query,
    );

    const skip =
      (query.page - 1) * query.limit;

    const [orders, totalOrders] =
      await Promise.all([
        prisma.order.findMany({
          where,
          skip,
          take: query.limit,
          orderBy: {
            [query.sortBy]: query.sortOrder,
          },
          include: {
            bill: {
              select: {
                totalAmount: true,
                paymentStatus: true,
              },
            },
          },
        }),
        prisma.order.count({ where }),
      ]);

    return this.buildResponse(
      orders,
      query.page,
      query.limit,
      totalOrders,
    );
  }

  private static buildWhere(
    customerId: string,
    query: ListOrderInput["query"],
  ): Prisma.OrderWhereInput {
    const where: Prisma.OrderWhereInput = {
      customerId,
    };

    this.applyStatusFilter(where, query.statusGroup);
    this.applySearchFilter(where, query.search);
    this.applyDateFilter(
      where,
      query.startDate,
      query.endDate,
    );

    return where;
  }

  private static applyStatusFilter(
    where: Prisma.OrderWhereInput,
    statusGroup: ListOrderInput["query"]["statusGroup"],
  ) {
    if (!statusGroup) {
      return;
    }

    where.customerStatus = {
      in: ORDER_STATUS_GROUPS[statusGroup],
    };
  }

  private static applySearchFilter(
    where: Prisma.OrderWhereInput,
    search?: string,
  ) {
    if (!search) {
      return;
    }

    where.orderCode = {
      contains: search,
      mode: "insensitive",
    };
  }

  private static applyDateFilter(
    where: Prisma.OrderWhereInput,
    startDate?: string,
    endDate?: string,
  ) {
    if (!startDate && !endDate) {
      return;
    }

    where.pickupDate = {
      ...(startDate && {
        gte: new Date(
          `${startDate}T00:00:00`,
        ),
      }),
      ...(endDate && {
        lte: new Date(
          `${endDate}T23:59:59.999`,
        ),
      }),
    };
  }

private static buildResponse(
  orders: OrderListItem[],
  page: number,
  limit: number,
  totalData: number,
) {
    const data = orders.map((order) => ({
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel:
        CUSTOMER_STATUS_LABELS[
          order.customerStatus
        ],
      pickupDate: order.pickupDate,
      totalAmount: order.bill?.totalAmount ?? null,
      paymentStatus:
        order.bill?.paymentStatus ?? null,
    }));

    return {
      data,
      meta: {
        page,
        limit,
        totalData,
        totalPage: Math.ceil(
          totalData / limit,
        ),
      },
    };
  }
}