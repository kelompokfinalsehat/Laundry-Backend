import { NextFunction, Request, Response } from 'express';
import { JWTUtil } from '../utils/Auth/jwt.utils';
import { ResponseError } from '../utils/errors/response-error.utils';


export class AuthMiddleware {
  static authenticated(secretKey: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const cookies = req?.cookies;
      if (!cookies?.token)
        throw new ResponseError("INVALID_TOKEN")

      const payload = JWTUtil.verifyAccessToken(cookies?.token?.token, secretKey);

      res.locals.payload = payload;

      next();
    };
  }

  static authorized(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { payload } = res?.locals;

      if (!allowedRoles.includes(payload.role))
        throw new ResponseError(
          "FORBIDDEN",
        );

      next();
    };
  }
}