import { Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OutletHelper } from "./outlet.helper";
import { OutletRepository } from "./outlet.repository";
import { CreateOutletBody, OutletQuery, UpdateOutletBody } from "./outlet.type";

export class OutletService {
  static async getOutlets(query: OutletQuery) {
    return await OutletRepository.findAll(query);
  }
  static async getOutletById(id: string) {
    const outlet = await OutletHelper.findOutletByIdOrThrow(id);
    return outlet;
  }
  static async createOutlet(body: CreateOutletBody) {
    const { name, address, latitude, longitude } = body;

    return await OutletRepository.create({
      name,
      address,
      latitude,
      longitude,
    });
  }
  static async updateOutlet(id: string, body: UpdateOutletBody) {
    await OutletHelper.findOutletByIdOrThrow(id);
    const updateData: Prisma.OutletUpdateInput = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.latitude !== undefined) updateData.latitude = body.latitude;
    if (body.longitude !== undefined) updateData.longitude = body.longitude;

    return await OutletRepository.update(id, updateData);
  }
  static async deactivateOutlet(id: string) {
    const now = new Date();
    const outlet = await OutletHelper.findOutletByIdOrThrow(id);
    if (!outlet.isActive) throw new ResponseError("CONFLICT", "Outlet sudah tidak aktif.");
    const employeeCount = await OutletRepository.hasActiveEmployee(id);
    if (employeeCount > 0) throw new ResponseError("CONFLICT", "Outlet memiliki karyawan yang masih aktif.");
    const activeOrderCount = await OutletRepository.hasActiveOrders(id);
    if (activeOrderCount > 0) throw new ResponseError("CONFLICT", "Outlet memiliki order yang masih berjalan/aktif.");
    return await OutletRepository.update(id, { isActive: false, deletedAt: now });
  }
}
