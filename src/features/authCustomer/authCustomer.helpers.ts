import { Customer, AuthToken } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class AuthCustomerHelper {
  /** Dipakai di register — pastikan email belum terdaftar. */
  static assertEmailAvailable(existing: Customer | null): void {
    if (existing) {
      throw new ResponseError("EMAIL_ALREADY_REGISTERED");
    }
  }

  /**
   * Dipakai di verifyCustomerEmail & resetPassword — validasi AuthToken
   * generik (belum dipakai, belum kedaluwarsa, punya customerId).
   * Setelah lolos, TypeScript otomatis tahu record.customerId pasti string.
   */
  static assertValidAuthToken(
    record: AuthToken | null,
    context: "EMAIL_VERIFICATION" | "PASSWORD_RESET",
  ): asserts record is AuthToken & { customerId: string } {
    const label =
      context === "EMAIL_VERIFICATION" ? "verifikasi" : "reset password";

    if (!record || !record.customerId) {
      throw new ResponseError("INVALID_TOKEN", `Link ${label} tidak valid.`);
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        `Link ${label} ini sudah pernah dipakai.`,
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        `Link ${label} sudah kedaluwarsa. Silakan minta link baru.`,
      );
    }
  }

  /** Dipakai di resendVerification — tolak kalau email sudah terverifikasi. */
  static assertNotYetVerified(customer: Customer): void {
    if (customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terverifikasi. Silakan login.",
      );
    }
  }

  /**
   * Dipakai di login — validasi customer boleh login pakai email/password.
   * Setelah lolos, TypeScript tahu customer.passwordHash pasti string.
   */
  static assertCustomerCanLogin(
    customer: Customer | null,
  ): asserts customer is Customer & { passwordHash: string } {
    if (!customer || customer.deletedAt) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    if (!customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Akun ini belum terverifikasi",
      );
    }

    if (customer.authProvider !== "EMAIL" || !customer.passwordHash) {
      throw new ResponseError(
        "GOOGLE_ACCOUNT_NO_PASSWORD",
        "Akun ini terdaftar via Google. Silakan login dengan Google.",
      );
    }
  }

  /** Dipakai di login — validasi hasil compare password. */
  static assertPasswordMatches(isValid: boolean): void {
    if (!isValid) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }
  }

  /** Dipakai di loginGoogle — tolak kalau email sudah dipakai provider EMAIL. */
  static assertGoogleLoginAllowed(existing: Customer | null): void {
    if (existing && existing.authProvider !== "GOOGLE") {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terdaftar menggunakan email/password. Silakan login dengan cara itu.",
      );
    }
  }

  /** Dipakai di loginGoogle — pastikan akun belum di-soft-delete. */
  static assertAccountActive(customer: Customer): void {
    if (customer.deletedAt) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun ini tidak aktif.");
    }
  }

  /**
   * Dipakai di forgotPassword — beda dari yang lain, ini TIDAK throw
   * (harus selalu balas generic response demi mencegah email enumeration).
   * Cukup dicek: apakah token reset perlu benar-benar diterbitkan atau tidak.
   */
  static assertPasswordResetEligible(
    customer: Customer | null,
  ): customer is Customer {
    if (!customer || customer.deletedAt) {
      return false; // caller balas generic response
    }

    if (customer.authProvider !== "EMAIL") {
      throw new ResponseError("GOOGLE_ACCOUNT_NO_PASSWORD");
    }

    return true;
  }
}
