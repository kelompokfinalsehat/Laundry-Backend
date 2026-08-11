import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTUtil } from "../utils/Auth/jwt.utils";
import { ResponseError } from "../utils/errors/response-error.utils";

export class AuthMiddleware {
  static authenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies?.accessToken;

      if (!token) {
        return next(
          new ResponseError("AUTHENTICATION_REQUIRED", "Anda belum login."),
        );
      }

      try {
        const payload = JWTUtil.verifyAccessToken(token);
        res.locals.payload = payload;
        next();
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          // WAJIB persis "ACCESS_TOKEN_EXPIRED" — axios interceptor di
          // frontend baca kode ini buat mutusin auto-refresh.
          return next(new ResponseError("ACCESS_TOKEN_EXPIRED", "Sesi kedaluwarsa."));
        }
        return next(new ResponseError("INVALID_TOKEN", "Token tidak valid."));
      }
    };
  }

  static authorized(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = res.locals.payload;

      if (!payload || !allowedRoles.includes(payload.role)) {
        return next(new ResponseError("FORBIDDEN", "Tidak punya akses."));
      }

      next();
    };
  }
}