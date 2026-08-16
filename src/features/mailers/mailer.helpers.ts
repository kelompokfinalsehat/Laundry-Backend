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
    const rawToken = await this.issueCustomerToken(
      customerId,
      "EMAIL_VERIFICATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendEmailVerification({ to: email, token: rawToken });
  }

  static async issueEmployeInvitationToken(
    employeeId: string,
    email: string,
    name: string
  ): Promise<void> {
    const rawToken = await this.issueEmployeToken(
      employeeId,
      "ACCOUNT_INVITATION",
      EMAIL_VERIFICATION_EXPIRY_HOURS,
    );
    await MailerService.sendEmployeeInvitation({ to: email, token: rawToken, name });
  }

  static async issuePasswordResetToken(
    customerId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueCustomerToken(
      customerId,
      "PASSWORD_RESET",
      PASSWORD_RESET_EXPIRY_HOURS,
    );
    await MailerService.sendPasswordReset({ to: email, token: rawToken });
  }

  static async issueEmployePasswordResetToken(
    employeeId: string,
    email: string,
  ): Promise<void> {
    const rawToken = await this.issueEmployeToken(
      employeeId,
      "PASSWORD_RESET",
      PASSWORD_RESET_EXPIRY_HOURS,
    );
    await MailerService.sendEmployeePasswordReset({ to: email, token: rawToken });
  }

  private static async issueCustomerToken(
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

  private static async issueEmployeToken(
    employeeId: string,
    type: AuthTokenType,
    expiryHours: number,
  ): Promise<string> {
    const { rawToken, tokenHash } = AuthTokenUtil.generateTokenPair();
    const expiresAt = AuthTokenUtil.addHours(new Date(), expiryHours);

    await prisma.$transaction([
      prisma.authToken.deleteMany({
        where: {  employeeId,type, usedAt: null },
      }),
      prisma.authToken.create({
        data: { employeeId, type, tokenHash, expiresAt },
      }),
    ]);

    return rawToken;
  }
}
