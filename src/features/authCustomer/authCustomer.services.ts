import { response } from "express";
import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmailVerificationTokenHelper } from "../mailers/emailVerification.helpers";
import {
  LoginCustomerInput,
  LoginGoogleInput,
  RegisterCustomerInput,
  VerifyEmailInput,
} from "./AuthCustomer.validation";
import { GoogleAuthService } from "../../utils/Auth/google.utils";


export class AuthCustomerService {
  static async register({ body }: RegisterCustomerInput) {
    const existing = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (existing) throw new ResponseError("EMAIL_ALREADY_REGISTERED");
    const customer = await prisma.customer.create({
      data: {
        email: body.email,
        name: "",
        passwordHash: null,
        authProvider: "EMAIL",
        isEmailVerified: false,
      },
    });

    await EmailVerificationTokenHelper.issue(customer.id, customer.email);

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

    if (!record || !record.customerId) {
      throw new ResponseError("INVALID_TOKEN", "Link verifikasi tidak valid.");
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link verifikasi ini sudah pernah dipakai.",
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link verifikasi sudah kedaluwarsa. Silakan minta link baru.",
      );
    }

    const authTokenId = record.id;

    const customerId = record.customerId;

    const passwordHash = await BcryptUtil.hash(body.password);

    await prisma.$transaction(async (tx) => {
      await tx.customer.update({
        where: { id: customerId },
        data: { name: body.name, passwordHash, isEmailVerified: true },
      });
      await tx.authToken.update({
        where: { id: authTokenId },
        data: { usedAt: new Date() },
      });
    });

    return { message: "Email berhasil diverifikasi. Silakan login." };
  }

  static async resendVerification({ body }: RegisterCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    // Pesan generik dipertahankan walau email nggak ketemu — sama alasannya
    // kayak di login, biar nggak jadi cara buat nebak email mana yang terdaftar.
    if (!customer) {
      return {
        message: "Jika email terdaftar, link verifikasi baru telah dikirim.",
      };
    }

    if (customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terverifikasi. Silakan login.",
      );
    }

    await EmailVerificationTokenHelper.issue(customer.id, customer.email);

    return {
      message: "link verifikasi baru telah dikirim.",
    };
  }
  static async login({ body }: LoginCustomerInput) {
    const customer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (!customer || customer.deletedAt) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    if (customer.isEmailVerified === false)
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Akun ini belum terverifikasi",
      );

    if (customer.authProvider !== "EMAIL" || !customer.passwordHash) {
      throw new ResponseError(
        "GOOGLE_ACCOUNT_NO_PASSWORD",
        "Akun ini terdaftar via Google. Silakan login dengan Google.",
      );
    }

    const isPasswordValid = await BcryptUtil.compare(
      body.password,
      customer.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

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

    if (existing && existing.authProvider !== "GOOGLE") {
      throw new ResponseError(
        "EMAIL_ALREADY_REGISTERED",
        "Email ini sudah terdaftar menggunakan email/password. Silakan login dengan cara itu.",
      );
    }

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

    if (customer.deletedAt) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun ini tidak aktif.");
    }
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      isEmailVerified: customer.isEmailVerified,
    };
  }
}
