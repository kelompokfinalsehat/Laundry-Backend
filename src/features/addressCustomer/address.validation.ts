import * as z from "zod";

export class AddressValidation {
  static readonly CREATE_ADDRESS = z.object({
    body: z.object({
      label: z.string().max(50).optional(),
      formattedAddress: z
        .string()
        .min(10, "Alamat terlalu pendek, tulis lebih lengkap"),
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
      formattedAddress: z
        .string()
        .min(10, "Alamat terlalu pendek, tulis lebih lengkap")
        .optional(),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20).optional(),
    }),
  });

  static readonly ADDRESS_ID = z.object({
    params: z.object({
      id: z.string().uuid("ID alamat tidak valid"),
    }),
  })
}

export type CreateAddressInput = z.infer<typeof AddressValidation.CREATE_ADDRESS>;
export type UpdateAddressInput = z.infer<typeof AddressValidation.UPDATE_ADDRESS>;
export type AddressIdInout=z.infer<typeof AddressValidation.ADDRESS_ID>