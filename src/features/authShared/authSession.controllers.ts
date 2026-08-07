import { Request, Response, NextFunction } from "express";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { Role } from "../../../generated/prisma";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";

export class AuthSessionController {
  /**
   * POST /auth/logout
   * Mencabut refresh token di database (bukan cuma hapus cookie), supaya
   * token yang mungkin sudah bocor sebelumnya tidak bisa dipakai lagi.
   */
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await RefreshTokenService.revoke(refreshToken);
      }

      AuthCookieUtil.clearAuthCookies(res);

      return res.json({ success: true, data: { message: "Berhasil logout." } });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /auth/refresh
   * Menukar refresh token lama dengan access token + refresh token baru,
   * tanpa user perlu login ulang. Role/data diambil ulang dari database
   * (bukan dari token lama) supaya perubahan role terbaru langsung berlaku.
   */
  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const rawRefreshToken = req.cookies.refreshToken;

      if (!rawRefreshToken) {
        throw new ResponseError("AUTHENTICATION_REQUIRED", "Tidak ada sesi aktif.");
      }

      const { owner, newRawToken } = await RefreshTokenService.rotate(rawRefreshToken);

      let sub: string;
      let accountType: "customer" | "employee";
      let role: Role;

      if (owner.customerId) {
        const customer = await prisma.customer.findUniqueOrThrow({
          where: { id: owner.customerId },
        });
        sub = customer.id;
        accountType = "customer";
        role = customer.role;
      } else {
        const employee = await prisma.employee.findUniqueOrThrow({
          where: { id: owner.employeeId! },
        });
        sub = employee.id;
        accountType = "employee";
        role = employee.role;
      }

      const newAccessToken = JWTUtil.signAccessToken({ sub, accountType, role });

      AuthCookieUtil.setAuthCookies(res, newAccessToken, newRawToken);

      return res.json({ success: true, data: { message: "Token diperbarui." } });
    } catch (err) {
      if (err instanceof ResponseError && err.code === "REFRESH_TOKEN_EXPIRED") {
        AuthCookieUtil.clearAuthCookies(res);
      }
      next(err);
    }
  }
}