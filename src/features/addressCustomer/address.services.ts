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

    const formattedAddress = `${body.streetDetail}, ${body.subDistrictName},${body.districtName}, ${body.cityName}, ${body.provinceName},${body.zipCode}`;

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
          provinceId: body.provinceId,
          provinceName: body.provinceName,
          cityId: body.cityId,
          cityName: body.cityName,
          districtId: body.districtId,
          districtName: body.districtName,
          subDistrictId: body.subDistrictId,
          subDistrictName: body.subDistrictName,
          streetDetail: body.streetDetail,
          zipCode: body.zipCode,
          formattedAddress: formattedAddress,
          phone: body.phone,
          latitude: body.latitude,
          longitude: body.longitude,
          isPrimary: shouldBePrimary,
        },
      });
    });

    const { customerId, ...safeAddress } = result;
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

    const locationFieldsChanged =
      (body.provinceName && body.provinceName !== address.provinceName) ||
      (body.cityName && body.cityName !== address.cityName) ||
      (body.districtName && body.districtName !== address.districtName) ||
      (body.subDistrictName &&
        body.subDistrictName !== address.subDistrictName) ||
      (body.zipCode && body.zipCode !== address.zipCode) ||
      (body.streetDetail && body.streetDetail !== address.streetDetail);

    let latitude = Number(address.latitude);
    let longitude = Number(address.longitude);
    let formattedAddress = address.formattedAddress;

    if (locationFieldsChanged) {
      const streetDetail = body.streetDetail ?? address.streetDetail;
      const subDistrictName = body.subDistrictName ?? address.subDistrictName;
      const districtName = body.districtName ?? address.districtName;
      const cityName = body.cityName ?? address.cityName;
      const provinceName = body.provinceName ?? address.provinceName;
      const zipCode = body.zipCode ?? address.zipCode;

      formattedAddress = `${streetDetail},${subDistrictName}, ${districtName}, ${cityName}, ${provinceName} ${zipCode}`;

      const geocoded = await GeocodingUtil.geocode(formattedAddress);
      latitude = geocoded.latitude;
      longitude = geocoded.longitude;
    }

    const updated = await prisma.customerAddress.update({
      where: { id: address.id },
      data: {
        label: body.label ?? address.label,
        provinceId: body.provinceId ?? address.provinceId,
        provinceName: body.provinceName?? address.provinceName,
        cityId: body.cityId ?? address.cityId,
        cityName:body.cityName ?? address.cityName,
        districtId: body.districtId ?? address.districtId,
        districtName:body.districtName?? address.districtName,
        subDistrictId: body.subDistrictId ?? address.subDistrictId,
        subDistrictName:body.subDistrictName?? address.subDistrictName,
        zipCode: body.zipCode ?? address.zipCode,
        streetDetail: body.streetDetail ?? address.streetDetail,
        formattedAddress,
        phone: body.phone ?? address.phone,
        latitude,
        longitude,
      },
    });
    const { customerId, ...saveUpdated } = updated;
    return saveUpdated;
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
