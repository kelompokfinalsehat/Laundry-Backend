import { NextFunction, Request, Response } from "express";
import { JWTUtil } from "../utils/Auth/jwt.utils";
import { ResponseError } from "../utils/errors/response-error.utils";

export class AuthMiddleware {
  static authenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies?.accessToken;

      if (!token) {
        return next(new ResponseError("ACCESS_TOKEN_REQUIRED"));
      }

      try {
        const payload = JWTUtil.verifyAccessToken(token);
        res.locals.payload = payload;
        next();
      } catch (err) {
        next(err); // JWTUtil sudah translate ke ResponseError yang benar, tinggal diteruskan
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