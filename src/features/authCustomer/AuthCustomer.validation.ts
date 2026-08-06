import * as z from "zod";

export class AuthCustomerValidation {
  static readonly REGISTER_CUSTOMER = z.object({
    body: z.object({
      email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid!")
        .transform((email) => email.trim().toLowerCase()),
    }),
  });

  static readonly VERIFY_EMAIL_CUSTOMER = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      name: z
        .string()
        .min(1, "Nama wajib diisi")
        .max(100, "Nama maksimal 100 karakter"),
      password: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });

  static readonly LOGIN_CUSTOMER = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(1, "Password wajib diisi"),
    }),
  });

  static readonly GOOGLE_LOGIN = z.object({
    body: z.object({ idToken: z.string().min(1, "idToken wajib diisi") }),
  });
}

export type RegisterCustomerInput = z.infer<
  typeof AuthCustomerValidation.REGISTER_CUSTOMER
>;
export type VerifyEmailInput = z.infer<
  typeof AuthCustomerValidation.VERIFY_EMAIL_CUSTOMER
>;
export type LoginCustomerInput = z.infer<
  typeof AuthCustomerValidation.LOGIN_CUSTOMER
>;
export type LoginGoogleInput = z.infer<
  typeof AuthCustomerValidation.GOOGLE_LOGIN
>;
