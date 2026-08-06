import { EMAIL_VERIFICATION_EXPIRY_HOURS } from "../../configs/env.config";
import { prisma } from "../../configs/prisma-client.config";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { MailerService } from "./mailer.service"; // sesuaikan path sesuai lokasi asli

export class EmailVerificationTokenHelper {
  /**
   * Membuat token verifikasi email baru untuk customer, menghapus token
   * lama yang belum dipakai (biar tidak ada token EMAIL_VERIFICATION
   * ganda aktif bersamaan), lalu mengirim email verifikasi berisi raw token.
   */
  static async issue(customerId: string, email: string): Promise<void> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(
      new Date(),
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );

    await prisma.$transaction([
      prisma.authToken.deleteMany({
        where: { customerId, type: "EMAIL_VERIFICATION", usedAt: null },
      }),
      prisma.authToken.create({
        data: { customerId, type: "EMAIL_VERIFICATION", tokenHash, expiresAt },
      }),
    ]);

    await MailerService.sendEmailVerification({ to: email, token: rawToken });
  }
}
