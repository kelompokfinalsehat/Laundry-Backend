import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ShippingRateQuery } from "./pricing.type";

export class PricingRepository {
  static async findCurrentLaundryPricing() {
    return await prisma.laundryPricing.findFirst({
      where: { deletedAt: null },
    });
  }
  static async findLaundryPricingById(id: string) {
    return await prisma.laundryPricing.findFirst({
      where: { id, deletedAt: null },
    });
  }
  static async createLaundryPricing(data: Prisma.LaundryPricingCreateInput) {
    return await prisma.laundryPricing.create({ data });
  }
  static async updateLaundryPricing(
    id: string,
    data: Prisma.LaundryPricingUpdateInput,
  ) {
    return await prisma.laundryPricing.update({ where: { id }, data });
  }
  static async getShippingRates(query: ShippingRateQuery) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const sortField = query.sortBy ?? "maxDistanceMeters";
    const where: Prisma.ShippingRateWhereInput = { deletedAt: null };
    if (query.search) {
      where.OR = [
        { maxDistanceMeters: Number(query.search) || undefined },
        { price: Number(query.search) || undefined },
      ];
    }
    const [shippingRates, totalItems] = await prisma.$transaction([
      prisma.shippingRate.findMany({
        where,
        take,
        skip,
        orderBy: {
          [sortField]: query.sortOrder ?? "asc",
        },
      }),
      prisma.shippingRate.count({ where }),
    ]);
    return {
      data: shippingRates,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findShippingRateById(id: string) {
    return prisma.shippingRate.findFirst({ where: { id, deletedAt: null } });
  }
  static async findShippingRateByExactDistance(distance: number) {
    return prisma.shippingRate.findFirst({where: {deletedAt: null, maxDistanceMeters: distance}})
  }
  static async findShippingRateByDistanceMeter(distance: number) {
    return prisma.shippingRate.findFirst({
      where: {
        deletedAt: null,
        maxDistanceMeters: {
          gte: distance,
        },
      },
      orderBy: { maxDistanceMeters: "asc" },
    });
  }
  static async createShippingRate(data: Prisma.ShippingRateCreateInput){
    return prisma.shippingRate.create({data})
  }
  static async updateShippingRate(id: string, data: Prisma.ShippingRateUpdateInput){
    return prisma.shippingRate.update({where: {id}, data})
  }
}
