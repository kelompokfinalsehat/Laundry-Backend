import * as z from "zod";

export class AddressValidation {
  static readonly CREATE_ADDRESS = z.object({
    body: z.object({
      label: z.string().max(50).optional(),
      provinceId: z.string().min(1, "Provinsi wajib dipilih"),
      provinceName: z.string().min(1),
      cityId: z.string().min(1, "Kota/Kabupaten wajib dipilih"),
      cityName: z.string().min(1),
      districtId: z.string().min(1, "Kecamatan wajib dipilih"),
      districtName: z.string().min(1),
      subDistrictId: z.string().min(1, "Kelurahan wajib dipilih"),
      subDistrictName: z.string().min(1),
      streetDetail: z
        .string()
        .min(5, "Detail alamat terlalu pendek, tulis lebih lengkap"),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20),
      isPrimary: z.boolean().optional(),
    }),
  });

  static readonly UPDATE_ADDRESS = z.object({
    params: z.object({
      id: z.string().uuid("ID alamat tidak valid"),
    }),
    body: z.object({
      label: z.string().max(50).optional(),
      provinceId: z.string().min(1, "Provinsi wajib dipilih"),
      provinceName: z.string().min(1),
      cityId: z.string().min(1, "Kota/Kabupaten wajib dipilih"),
      cityName: z.string().min(1),
      districtId: z.string().min(1, "Kecamatan wajib dipilih"),
      districtName: z.string().min(1),
      subDistrictId: z.string().min(1, "Kelurahan wajib dipilih"),
      subDistrictName: z.string().min(1),
      streetDetail: z
        .string()
        .min(5, "Detail alamat terlalu pendek, tulis lebih lengkap"),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20).optional(),
    }),
  });

  static readonly ADDRESS_ID = z.object({
    params: z.object({
      id: z.string().uuid("ID alamat tidak valid"),
    }),
  });
}

export type CreateAddressInput = z.infer<
  typeof AddressValidation.CREATE_ADDRESS
>;
export type UpdateAddressInput = z.infer<
  typeof AddressValidation.UPDATE_ADDRESS
>;
export type AddressIdInout = z.infer<typeof AddressValidation.ADDRESS_ID>;
