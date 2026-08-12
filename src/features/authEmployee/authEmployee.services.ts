import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { AuthTokenUtil } from "../../utils/Auth/token.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AuthTokenIssuer } from "../mailers/emailVerification.helpers";
import {
  AcceptInvitationInput,
  ForgotPasswordEmployeeInput,
  LoginEmployeeInput,
  ResetPasswordEmployeeInput,
} from "./authEmployee.validation";

export class AuthEmployeeService {
  static async login({ body }: LoginEmployeeInput) {
    const employee = await prisma.employee.findUnique({
      where: { email: body.email },
    });

    if (!employee || employee.deletedAt) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    if (employee.accountStatus === "INVITED" || !employee.passwordHash) {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun belum diaktivasi. Selesaikan proses undangan terlebih dahulu.",
      );
    }

    if (employee.accountStatus === "INACTIVE") {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun ini sudah dinonaktifkan.",
      );
    }

    const isPasswordValid = await BcryptUtil.compare(
      body.password,
      employee.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ResponseError(
        "INVALID_CREDENTIALS",
        "Email atau password salah.",
      );
    }

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      currentOutletId: employee.currentOutletId,
    };
  }
  static async acceptInvitation({ body }: AcceptInvitationInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "ACCOUNT_INVITATION" },
    });

    if (!record || !record.employeeId) {
      throw new ResponseError("INVALID_TOKEN", "Link undangan tidak valid.");
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link undangan ini sudah pernah dipakai.",
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link undangan sudah kedaluwarsa. Hubungi Super Admin untuk mengirim ulang undangan.",
      );
    }

    const passwordHash = await BcryptUtil.hash(body.password);

    await prisma.$transaction([
      prisma.employee.update({
        where: { id: record.employeeId },
        data: { passwordHash, accountStatus: "ACTIVE" },
      }),
      prisma.authToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return { message: "Akun berhasil diaktivasi. Silakan login." };
  }
  static async forgotPassword({ body }: ForgotPasswordEmployeeInput) {
    const genericResponse = {
      message: "Jika email terdaftar, link reset password telah dikirim.",
    };

    const employee = await prisma.employee.findUnique({
      where: { email: body.email },
    });

    if (!employee || employee.deletedAt) {
      return genericResponse;
    }

    if (employee.accountStatus === "INVITED" || !employee.passwordHash) {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun belum diaktivasi. Selesaikan proses undangan terlebih dahulu.",
      );
    }

    if (employee.accountStatus === "INACTIVE") {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Akun ini sudah dinonaktifkan.",
      );
    }

    await AuthTokenIssuer.issueEmployePasswordResetToken(
      employee.id,
      employee.email,
    );

    return genericResponse;
  }
  static async resetPasword({ body }: ResetPasswordEmployeeInput) {
    const tokenHash = AuthTokenUtil.hashToken(body.token);

    const record = await prisma.authToken.findFirst({
      where: { tokenHash, type: "PASSWORD_RESET" },
    });

    if (!record || !record.employeeId) {
      throw new ResponseError(
        "INVALID_TOKEN",
        "Link reset password tidak valid.",
      );
    }

    if (record.usedAt) {
      throw new ResponseError(
        "TOKEN_ALREADY_USED",
        "Link reset password ini sudah pernah dipakai.",
      );
    }

    if (record.expiresAt <= new Date()) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Link reset password sudah kedaluwarsa. Silakan minta link baru.",
      );
    }

    const passwordHash = await BcryptUtil.hash(body.newPassword);

    await prisma.$transaction([
      prisma.employee.update({
        where: { id: record.employeeId },
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
