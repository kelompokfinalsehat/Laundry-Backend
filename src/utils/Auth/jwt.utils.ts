import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../configs/env.config";
import { ResponseError } from "../errors/response-error.utils";
import { Role } from "../../../generated/prisma";
import { ACCESS_TOKEN_EXPIRES_IN } from "../../configs/env.config";

export interface JWTPayload {
  sub: string;
  accountType: "customer" | "employee";
  role: Role;
}

export class JWTUtil {
  static signAccessToken(payload: JWTPayload) {
    if (!JWT_SECRET_KEY) {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "JWT_SECRET_KEY belum dikonfigurasi",
      );
    }

    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "7d",
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
        throw new ResponseError("ACCESS_TOKEN_EXPIRED", "Sesi kedaluwarsa."); // ✅
      }
      if (error instanceof JsonWebTokenError) {
        throw new ResponseError("INVALID_TOKEN", "Token tidak valid."); // ✅
      }
      throw error;
    }
  }
}
