import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import {
  ForgotPasswordInput,
  LoginCustomerInput,
  LoginGoogleInput,
  RegisterCustomerInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from "./AuthCustomer.validation";
import { GoogleAuthService } from "../../utils/Auth/google.utils";
import { AuthTokenIssuer } from "../mailers/emailVerification.helpers";
import { AuthCustomerHelper } from "./authCustomer.helpers";

export class AuthCustomerService {
  static async register({ body }: RegisterCustomerInput) {
    const existing = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    AuthCustomerHelper.assertEmailAvailable(existing);

    const customer = await prisma.customer.create({
      data: {
        email: body.email,
        name: "",
        passwordHash: null,
        authProvider: "EMAIL",
        isEmailVerified: false,
      },
    });

    await AuthTokenIssuer.issueEmailVerificationToken(
      customer.id,
      customer.email,
    );

    return {
      email: customer.email,
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
    };
  }

  static async verifyCustomerEmail({ body }: VerifyEmailInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "EMAIL_VERIFICATION" },
    });

    AuthCustomerHelper.assertValidAuthToken(record, "EMAIL_VERIFICATION");
    // setelah baris di atas, TypeScript tahu record.customerId pasti string

    const passwordHash = await BcryptUtil.hash(body.password);

    await prisma.$transaction(async (tx) => {
      await tx.customer.update({
        where: { id: record.customerId },
        data: { name: body.name, passwordHash, isEmailVerified: true },
      });
      await tx.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      });
    });

    return { message: "Email berhasil diverifikasi. Silakan login." };
  }

  static async resendVerification({ body }: RegisterCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (!customer) {
      return {
        message: "Jika email terdaftar, link verifikasi baru telah dikirim.",
      };
    }

    AuthCustomerHelper.assertNotYetVerified(customer);

    await AuthTokenIssuer.issueEmailVerificationToken(
      customer.id,
      customer.email,
    );

    return { message: "link verifikasi baru telah dikirim." };
  }

  static async login({ body }: LoginCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    AuthCustomerHelper.assertCustomerCanLogin(customer);
    // setelah baris di atas, TypeScript tahu customer.passwordHash pasti string

    const isPasswordValid = await BcryptUtil.compare(
      body.password,
      customer.passwordHash,
    );
    AuthCustomerHelper.assertPasswordMatches(isPasswordValid);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      isEmailVerified: customer.isEmailVerified,
    };
  }

  static async loginGoogle({ body }: LoginGoogleInput) {
    const profile = await GoogleAuthService.verifyIdToken(body.idToken);

    const existing = await prisma.customer.findUnique({
      where: { email: profile.email },
    });

    AuthCustomerHelper.assertGoogleLoginAllowed(existing);

    const customer =
      existing ??
      (await prisma.customer.create({
        data: {
          email: profile.email,
          name: profile.name,
          passwordHash: null,
          authProvider: "GOOGLE",
          isEmailVerified: true,
        },
      }));

    AuthCustomerHelper.assertAccountActive(customer);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      isEmailVerified: customer.isEmailVerified,
    };
  }

  static async forgotPassword({ body }: ForgotPasswordInput) {
    const genericResponse = {
      message: "Jika email terdaftar, link reset password telah dikirim.",
    };

    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (!AuthCustomerHelper.assertPasswordResetEligible(customer)) {
      return genericResponse;
    }

    await AuthTokenIssuer.issuePasswordResetToken(customer.id, customer.email);

    return genericResponse;
  }

  static async resetPassword({ body }: ResetPasswordInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "PASSWORD_RESET" },
    });

    AuthCustomerHelper.assertValidAuthToken(record, "PASSWORD_RESET");

    const passwordHash = await BcryptUtil.hash(body.newPassword);

    await prisma.$transaction([
      prisma.customer.update({
        where: { id: record.customerId },
        data: { passwordHash },
      }),
      prisma.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({
        where: { customerId: record.customerId },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      message:
        "Password berhasil diperbarui. Silakan login dengan password baru.",
    };
  }
}
