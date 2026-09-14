import { CustomerStatus, DriverAssignmentStatus, PickupDeliveryType, Prisma, Role, StationType, WorkerAssignmentStatus, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { CreateOrderTransactionData, OrderQuery } from "./order.type";

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
          paidAt: true
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
    if(query.endDate){
      query.endDate.setDate(query.endDate.getDate() + 1)
      query.endDate.setHours(0, 0, 0, 0)
    }
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
        where.pickupScheduledAt = {...(query.startDate && {gte: query.startDate}), ...(query.endDate && {lt: query.endDate})}
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
    return await prisma.order.findFirst({where: {id, ...(outletId && {outletId})}, include: this.orderDetailInclude})
  }
  static async findPickupAssignment(orderId: string){
    return await prisma.driverAssignment.findFirst({where: {orderId, taskType: PickupDeliveryType.PICKUP, status: {in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS]}}, include: {driver: true}})
  }
  static async receiveOrder(orderId: string, assignmentId: string, driverId: string, receivedBy: string){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const assignment = await tx.driverAssignment.updateMany({where: {id: assignmentId, orderId, driverId, status: DriverAssignmentStatus.IN_PROGRESS}, data: {status: DriverAssignmentStatus.COMPLETED, completedAt: now}})
        if(assignment.count === 0) throw new ResponseError("INVALID_STATE_TRANSITION", 'Pesanan sudah tidak dapat diterima.')
        await tx.employee.update({where: {id: driverId, role: Role.DRIVER}, data: {workStatus: WorkStatus.AVAILABLE}})
        await tx.order.update({where: {id: orderId}, data: {receivedAt: now, receivedBy, customerStatus: CustomerStatus.ARRIVED_AT_OUTLET}})
        return tx.order.findFirst({where: {id: orderId}, include: this.orderDetailInclude})
    })
  }
  static async createOrder(data: CreateOrderTransactionData){
    return await prisma.$transaction(async (tx) => {
        await tx.bill.create({data: {
            orderId: data.orderId,
            laundryPricingId: data.laundryPricingId,
            pricePerKgSnapshot: data.pricePerKgSnapshot,
            shippingRateId: data.shippingRateId,
            shippingFeeSnapshot: data.shippingFeeSnapshot,
            weightKg: data.weightKg,
            totalAmount: data.totalAmount
        }})
        await tx.orderItem.createMany({data: data.items.map((item) => ({
            orderId: data.orderId,
            laundryItemId: item.laundryItemId,
            quantity: item.quantity
        }))})
        await tx.workerAssignment.create({data: {
            orderId: data.orderId,
            outletId: data.outletId,
            stationType: StationType.WASHING,
            status: WorkerAssignmentStatus.QUEUED
        }})
        return tx.order.findFirst({where: {id: data.orderId}, include: this.orderDetailInclude})
    })
  }
}
