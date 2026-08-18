import { BypassStatus, CustomerStatus, Prisma, WorkerAssignmentStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { BypassQuery, QuantityDifference } from "./bypass.type";

export class BypassRepository {
  private static readonly bypassListInclude =
    Prisma.validator<Prisma.BypassRequestInclude>()({
      order: {
        select: {
          id: true,
          orderCode: true,
          outletId: true,
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      workerAssignment: {
        select: {
          id: true,
          stationType: true,
          status: true,
          worker: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      requestedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
      decidedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
    });
  private static readonly bypassDetailInclude =
    Prisma.validator<Prisma.BypassRequestInclude>()({
      order: {
        include: {
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
          outlet: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      workerAssignment: {
        select: {
          id: true,
          stationType: true,
          status: true,
          workerId: true
        },
      },
      requestedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
      decidedByUser: {
        select: {
          id: true,
          name: true,
        },
      },
    });
  static async findAll(query: BypassQuery, outletId?: string) {
    const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
    const where: Prisma.BypassRequestWhereInput = {}
    if(outletId) where.order = {outletId}
    if(query.search){
        where.OR = [
            {
                order: {
                    orderCode: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                }
            },
            {
                requestedByUser: {
                    name: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                }
            }
        ]
    }
    if(query.status) where.status = query.status
    if(query.stationType) where.stationType = query.stationType
    if(query.startDate || query.endDate) {
        where.createdAt = {
            ...(query.startDate && {
                gte: query.startDate
            }),
            ...(query.endDate && {
                lte: query.endDate
            })
        }
    }
    const [bypassRequests, totalItems] = await prisma.$transaction([
        prisma.bypassRequest.findMany({where, skip, take, include: this.bypassListInclude, orderBy: {[query.sortBy]: query.sortOrder}}),
        prisma.bypassRequest.count({where})
    ])
    return {
        data: bypassRequests,
        meta: PaginationHelper.meta(page, pageSize, totalItems)
    }
  }
  static async findById(id: string, outletId?: string){
    return await prisma.bypassRequest.findFirst({where: {id, ...(outletId && {order: {outletId}})}, include: this.bypassDetailInclude})
  }
  static async findForDecision(id: string, outletId: string){
    return await prisma.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING, order: {outletId}}, include: {order: {include: {orderItems: true}}, workerAssignment: true}})
  }
  static async approve(id: string, decidedBy: string, approvalNote: string, differences: QuantityDifference[]){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const bypass = await tx.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING}, include: {workerAssignment: true}})
        if(!bypass) return null
        if(bypass.workerAssignment.status !== WorkerAssignmentStatus.ON_HOLD_BYPASS) throw new ResponseError('CONFLICT', 'Status pengerjaan sedang tidak di-hold.')
        for(const difference of differences){
            await tx.orderItem.update({where: {id: difference.orderItemId}, data: {quantity: difference.submittedQuantity}})
        }
        await tx.order.update({where: {id: bypass.workerAssignment.orderId}, data: {customerStatus: CustomerStatus[bypass.stationType]}})
        await tx.workerAssignment.update({where: {id: bypass.workerAssignmentId}, data: {status: WorkerAssignmentStatus.IN_PROGRESS, startedAt: now}, include: {order: true, worker: true}})
        return tx.bypassRequest.update({where: {id}, data:{status: BypassStatus.APPROVED, decidedBy, decidedAt: now, approvalNote}})
    })
  }
  static async reject(id: string, decidedBy: string){
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
        const bypass = await tx.bypassRequest.findFirst({where: {id, status: BypassStatus.PENDING}, include: {workerAssignment: true}})
        if(!bypass) return null
        if(bypass.workerAssignment.status !== WorkerAssignmentStatus.ON_HOLD_BYPASS) throw new ResponseError('CONFLICT', 'Status pengerjaan sedang tidak di-hold.')
        await tx.workerAssignment.update({where: {id: bypass.workerAssignmentId}, data: {status: WorkerAssignmentStatus.ASSIGNED}, include: {order: true, worker: true}})
        return tx.bypassRequest.update({where: {id}, data: {status: BypassStatus.REJECTED, decidedBy, decidedAt: now}})
    })
  }
}
