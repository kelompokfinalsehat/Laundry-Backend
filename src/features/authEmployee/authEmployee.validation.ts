import * as z from "zod";

export class AuthEmployeeValidation {
  static readonly LOGIN_EMPLOYEE = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
      password: z.string().min(1, "Password wajib diisi"),
    }),
  });

  static readonly ACCEPT_INVITATION = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      password: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });

  static readonly FORGOT_PASSWORD = z.object({
    body: z.object({
      email: z.string().email("Format email tidak valid"),
    }),
  });

  static readonly RESET_PASSWORD = z.object({
    body: z.object({
      token: z.string().min(1, "Token wajib diisi"),
      newPassword: z.string().min(8, "Password minimal 8 karakter"),
    }),
  });
}

export type LoginEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.LOGIN_EMPLOYEE
>;
export type AcceptInvitationInput = z.infer<
  typeof AuthEmployeeValidation.ACCEPT_INVITATION
>;
export type ForgotPasswordEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.FORGOT_PASSWORD
>;
export type ResetPasswordEmployeeInput = z.infer<
  typeof AuthEmployeeValidation.RESET_PASSWORD
>;
