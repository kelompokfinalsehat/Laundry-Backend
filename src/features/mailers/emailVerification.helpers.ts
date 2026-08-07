import { AuthTokenType } from "../../../generated/prisma";
import {
  EMAIL_VERIFICATION_EXPIRY_HOURS,
  PASSWORD_RESET_EXPIRY_HOURS,
} from "../../configs/env.config";
import { prisma } from "../../configs/prisma-client.config";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { MailerService } from "./mailer.service"; // sesuaikan path sesuai lokasi asli

export class AuthTokenIssuer {
  static async issueEmailVerificationToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issue(
      customerId,
      "EMAIL_VERIFICATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendEmailVerification({ to: email, token: rawToken });
  }

  static async issuePasswordResetToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issue(
      customerId,
      "PASSWORD_RESET",
      PASSWORD_RESET_EXPIRY_HOURS,
    );
    await MailerService.sendPasswordReset({ to: email, token: rawToken });
  }

  private static async issue(
    customerId: string,
    type: AuthTokenType,
    expiryHours: number,
  ): Promise<string> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(new Date(), expiryHours);

    await prisma.$transaction([
      prisma.authToken.deleteMany({
        where: { customerId, type, usedAt: null },
      }),
      prisma.authToken.create({
        data: { customerId, type, tokenHash, expiresAt },
      }),
    ]);

    return rawToken;
  }
}
