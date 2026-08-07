import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/env.config";
import { ResponseError } from "../errors/response-error.utils";
import { Role } from "../../../generated/prisma";

export interface JWTPayload {
  sub: string;
  accountType: "customer" | "employee";
  role: Role;
}
export class JWTUtil {
  private static readonly ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
  static signAccessToken(payload: JWTPayload) {
    if (!JWT_SECRET_KEY) {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "JWT_SECRET_KEY belum dikonfigurasi",
      );
    }

    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWTUtil.ACCESS_TOKEN_MAX_AGE,
    });
  }

  static verifyAccessToken(
    token: string,
    secretKey: string = JWT_SECRET_KEY!,
  ): JWTPayload {
    if (!secretKey) {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "JWT_SECRET_KEY belum dikonfigurasi",
      );
    }
    try {
      return jwt.verify(token, secretKey) as JWTPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ResponseError(
          "AUTHENTICATION_REQUIRED",
          "Sesi telah berakhir. Silahkan login kembali",
        );
      }

      if (error instanceof JsonWebTokenError) {
        throw new ResponseError(
          "AUTHENTICATION_REQUIRED",
          "Sesi tidak valid. Silahkan login kembali!",
        );
      }
      throw error;
    }
  }
}
