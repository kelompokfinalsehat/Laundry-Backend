import * as z from "zod";

export class EmployeeProfileValidation {
  static readonly UPDATE_PROFILE = z.object({
    body: z.object({
      name: z.string().min(1, "Nama tidak boleh kosong").max(100).optional(),
      phone: z.string().min(8, "Nomor telepon tidak valid").max(20).optional(),
      currentPassword: z.string().optional(),
      newPassword: z.string().min(8, "Password minimal 8 karakter").optional(),
    }).refine((v) => (v.newPassword ? !!v.currentPassword : true), {
        message: "Password saat ini wajib diisi untuk mengganti password",
        path: ["currentPassword"],
      }), 
  });
}
