import { AccountStatus, CustomerStatus, Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { OutletQuery } from "./outlet.type";

export class OutletRepository {
  private static readonly outletInclude =
    Prisma.validator<Prisma.OutletInclude>()({
      staffOnDuty: {
        select: {
          id: true,
          name: true,
          role: true,
          workStatus: true,
          accountStatus: true,
        },
      },
    });
  static async findAll(query: OutletQuery) {
    const { page, take, pageSize, skip } = PaginationHelper.paginate(query);
    const sortField = query.sortBy ?? "createdAt";
    const where: Prisma.OutletWhereInput = {deletedAt: null, isActive: true};
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    const [outlets, totalItems] = await prisma.$transaction([
      prisma.outlet.findMany({
        where,
        skip,
        take,
        include: this.outletInclude,
        orderBy: {
          [sortField]: query.sortOrder ?? "desc",
        },
      }),
      prisma.outlet.count({
        where,
      }),
    ]);

    return {
      data: outlets,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string) {
    return await prisma.outlet.findUnique({
      where: { id, deletedAt: null },
      include: this.outletInclude,
    });
  }
  static async create(data: Prisma.OutletCreateInput){
    return await prisma.outlet.create({
        data,
        include: this.outletInclude
    })
  }
  static async update(id: string, data: Prisma.OutletUpdateInput){
    return await prisma.outlet.update({
        where: {id},
        data,
        include: this.outletInclude
    })
  }
  static async hasActiveEmployee(id: string){
    return await prisma.employee.count({where: {currentOutletId: id, accountStatus: AccountStatus.ACTIVE}})
  }
  static async hasActiveOrders(id: string){
    return await prisma.order.count({where: {outletId: id, customerStatus: {notIn: [CustomerStatus.RECEIVED_BY_CUSTOMER, CustomerStatus.OVERDUE]}}})
  }
}
