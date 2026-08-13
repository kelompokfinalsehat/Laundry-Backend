import * as z from "zod";

export class ProfileCustomerValidation {
  static readonly UPDATE_PROFILE = z.object({
    body: z
      .object({
        name: z.string().min(1, "Nama tidak boleh kosong").max(100).optional(),
        phone: z
          .string()
          .min(8, "Nomor telepon tidak valid")
          .max(20)
          .optional(),
        currentPassword: z.string().optional(),
        newPassword: z
          .string()
          .min(8, "Password minimal 8 karakter")
          .optional(),
      })
      .refine((v) => (v.newPassword ? !!v.currentPassword : true), {
        message: "Password saat ini wajib diisi untuk mengganti password",
        path: ["currentPassword"],
      }), 
  });

  static readonly UPDATE_EMAIL = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
    }),
  });

  static readonly CONFIRM_EMAIL = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
    }),
  });
}

export type UpdateProfileInput = z.infer<typeof ProfileCustomerValidation.UPDATE_PROFILE>;
export type UpdateEmailInput = z.infer<typeof ProfileCustomerValidation.UPDATE_EMAIL>;
export type ConfirmEmailChangeInput = z.infer<typeof ProfileCustomerValidation.CONFIRM_EMAIL>;
