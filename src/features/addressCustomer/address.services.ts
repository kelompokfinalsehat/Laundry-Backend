import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import { userPayload } from "../../validations/validate";
import { assertOwnership } from "./address.helpers";
import {
  AddressIdInout,
  CreateAddressInput,
  UpdateAddressInput,
} from "./address.validation";

const MAX_ADDRESSES_PER_CUSTOMER = 5;
const MIN_GEOCODE_CONFIDENCE = 7; 

export class AddressService {
  static async create(payload: userPayload, { body }: CreateAddressInput) {
    const existingCount = await prisma.customerAddress.count({
      where: { customerId: payload.sub, deletedAt: null },
    });

    if (existingCount >= MAX_ADDRESSES_PER_CUSTOMER) {
      throw new ResponseError(
        "ADDRESS_LIMIT_REACHED",
        `Maksimal ${MAX_ADDRESSES_PER_CUSTOMER} alamat tersimpan. Hapus salah satu untuk menambah alamat baru.`,
      );
    }

    const { latitude, longitude} = await GeocodingUtil.geocode(
      body.formattedAddress,
    );
    const shouldBePrimary = existingCount === 0 || body.isPrimary === true;

    const result = await prisma.$transaction(async (tx) => {
      if (shouldBePrimary) {
        await tx.customerAddress.updateMany({
          where: { customerId: payload.sub, deletedAt: null },
          data: { isPrimary: false },
        });
      }
      return tx.customerAddress.create({
        data: {
          customerId: payload.sub,
          label: body.label ?? null,
          formattedAddress: body.formattedAddress,
          phone: body.phone,
          latitude,
          longitude,
          isPrimary: shouldBePrimary,
        },
      });
    });

    const { id, customerId, ...safeAddress } = result;
    return safeAddress;
  }
  static async getAddress(payload: userPayload) {
    const address = await prisma.customerAddress.findMany({
      where: { customerId: payload.sub, deletedAt: null },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });

    if (!address) throw new ResponseError("ADDRESS_FORBIDDEN");

    return address;
  }
  static async update(
    payload: userPayload,
    { params, body }: UpdateAddressInput,
  ) {
    const address = await assertOwnership(payload.sub, params.id);

    const coordinates = body.formattedAddress
      ? await GeocodingUtil.geocode(body.formattedAddress)
      : undefined;
    return prisma.customerAddress.update({
      where: { id: address.id },
      data: {
        ...(body.label !== undefined && { label: body.label }),
        ...(body.formattedAddress !== undefined && {
          formattedAddress: body.formattedAddress,
        }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(coordinates && {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }),
      },
    });
  }
  static async delete(payload: userPayload, { params }: AddressIdInout) {
    const address = await assertOwnership(payload.sub, params.id);

    await prisma.customerAddress.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });

    if (address.isPrimary) {
      const nextAddress = await prisma.customerAddress.findFirst({
        where: { customerId: address.customerId, deletedAt: null },
        orderBy: { createdAt: "asc" },
      });

      if (nextAddress) {
        await prisma.customerAddress.update({
          where: { id: nextAddress.id },
          data: { isPrimary: true },
        });
      }
    }
    return address.label;
  }
  static async setPrimary(payload: userPayload, { params }: AddressIdInout) {
    const address = await assertOwnership(payload.sub, params.id);

    await prisma.$transaction([
      prisma.customerAddress.updateMany({
        where: { customerId: payload.sub, deletedAt: null },
        data: { isPrimary: false },
      }),
      prisma.customerAddress.update({
        where: { id: address.id },
        data: { isPrimary: true },
      }),
    ]);

    return address.label;
  }
}
