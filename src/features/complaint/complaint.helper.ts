import { Prisma } from "../../../generated/prisma";
import { ComplaintQuery } from "./complaint.type";

export class ComplaintHelper {
  static readonly listInclude = Prisma.validator<Prisma.ComplaintInclude>()({
    customer: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },

    order: {
      select: {
        id: true,
        orderCode: true,
        outletId: true,
      },
    },

    handledByUser: {
      select: {
        id: true,
        name: true,
      },
    },
  });
  static readonly detailInclude = Prisma.validator<Prisma.ComplaintInclude>()({
    customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      order: {
        include: {
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },

          orderItems: {
            include: {
              laundryItem: {
                select: {
                  id: true,
                  name: true,
                },
              },
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
        },
      },

      handledByUser: {
        select: {
          id: true,
          name: true,
        },
      },
  })
  static defineComplaintQuery(query: ComplaintQuery, outletId?: string){
    const where: Prisma.ComplaintWhereInput = {}
        if(outletId) where.order = {outletId}
        if(query.search){
            where.OR = [
                {order: {orderCode: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
                {customer: {name: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
                {customer: {email: {
                    contains: query.search,
                    mode: "insensitive"
                }}},
            ]
        }
        if(query.status) where.status = query.status
        if(query.category) where.category = query.category
        if(query.startDate || query.endDate){
            where.createdAt = {
                ...(query.startDate && {
                    gte: query.startDate
                }),
                ...(query.endDate && {
                    lte: query.endDate
                })
            }
        }
        return where
  }
}
