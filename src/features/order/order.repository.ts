import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { OrderQuery } from "./order.type";

export class OrderRepository {
  private static readonly orderListInclude =
    Prisma.validator<Prisma.OrderInclude>()({
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      outlet: {
        select: {
          id: true,
          name: true,
        },
      },
      bill: {
        select: {
          id: true,
          weightKg: true,
          totalAmount: true,
          paymentStatus: true,
        },
      },
    });
  private static readonly orderDetailInclude =
    Prisma.validator<Prisma.OrderInclude>()({
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      outlet: {
        select: {
          id: true,
          name: true,
        },
      },
      bill: {
        select: {
          id: true,
          weightKg: true,
          totalAmount: true,
          paymentStatus: true,
        },
      },
      orderItems: {
        include: {
          laundryItem: true,
        },
      },
      driverAssignments: {
        include: {
          driver: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      workerAssignments: {
        include: {
          worker: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      complaint: true,
    });
  static async findAll(query: OrderQuery, outletId?: string) {
    const { page, pageSize, take, skip } = PaginationHelper.paginate(query);
    const where: Prisma.OrderWhereInput = {};
    if (outletId) where.outletId = outletId;
    else if (query.outletId) where.outletId = query.outletId;
    if (query.search) {
      where.OR = [
        {
          orderCode: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          customer: {
            name: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
        {
          customer: {
            email: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    if(query.customerStatus) where.customerStatus = query.customerStatus
    if(query.paymentStatus) where.bill = {paymentStatus: query.paymentStatus}
    if(query.startDate || query.endDate) {
        where.pickupScheduledAt = {...(query.startDate && {gte: query.startDate}), ...(query.endDate && {lte: query.endDate})}
    }
    const [orders, totalItems] = await prisma.$transaction([
        prisma.order.findMany({
            where,
            skip,
            take,
            include: this.orderListInclude,
            orderBy: {[query.sortBy] : query.sortOrder}
        }),
        prisma.order.count({
            where
        })
    ])
    return {
        data: orders,
        meta: PaginationHelper.meta(page, pageSize, totalItems)
    }
  }
  static async findById(id: string, outletId?: string){
    return await prisma.order.findFirst({where: {id, outletId}, include: this.orderDetailInclude})
  }
}
