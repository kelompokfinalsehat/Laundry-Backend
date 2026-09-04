import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { CustomerQuery } from "./customer.type";

export class CustomerRepository {
  static async findCustomers(query: CustomerQuery) {
    const { page, pageSize, take, skip } = PaginationHelper.paginate(query);
    const where: Prisma.CustomerWhereInput = {};
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.isEmailVerified !== undefined) where.isEmailVerified = query.isEmailVerified;
    const [customers, totalItems] = await prisma.$transaction([
      prisma.customer.findMany({
        where,
        skip,
        take,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isEmailVerified: true,
          createdAt: true,
        },
      }),
      prisma.customer.count({ where }),
    ]);
    return {
      data: customers,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,

        addresses: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            label: true,
            formattedAddress: true,
            latitude: true,
            longitude: true,
            phone: true,
            isPrimary: true,
            createdAt: true,
          },
        },
      },
    });
  }
}
