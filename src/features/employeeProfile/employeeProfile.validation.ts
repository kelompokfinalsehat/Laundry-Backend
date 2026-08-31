import * as z from "zod";

export class EmployeeProfileValidation {
  static readonly UPDATE_PROFILE = z.object({
    body: z.object({
      name: z.string().min(1, "Nama tidak boleh kosong").max(100).optional(),
      email: z.email("Format email tidak valid").optional(),
      phone: z
        .string()
        .min(8, "Nomor telepon tidak valid")
        .max(20)
        .optional(),
    }),
  });
}

