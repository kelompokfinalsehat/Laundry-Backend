import morgan, { StreamOptions } from 'morgan';
import { Request, RequestHandler } from 'express';
import { logger } from '../configs/logger.config';
import 'dotenv/config';
import { JWTUtil } from '../utils/Auth/jwt.utils';
import { JWT_SECRET_KEY } from '../configs/env.config';

export class MorganMiddleware {
  private static readonly format =
    ':method :url :status :res[content-length] - :response-time ms - user::user-id';

  private static readonly stream: StreamOptions = {
    write: (message) => logger.http(message.trim()),
  };

  private static skip(): boolean {
    const env = process.env.NODE_ENV || 'development';
    return env === 'test';
  }

  private static registerTokens(): void {
    morgan.token('user-id', (req: Request) => {
      try {
        const cookies = req?.cookies;

        const payload = JWTUtil.verifyAccessToken(
          cookies?.token?.token,
          JWT_SECRET_KEY!,
        );

        return typeof payload.sub === 'string' ? payload.sub : 'guest';
      } catch {
        return 'guest';
      }
    });
  }

  static handler(): RequestHandler {
    MorganMiddleware.registerTokens();

    return morgan(MorganMiddleware.format, {
      stream: MorganMiddleware.stream,
      skip: MorganMiddleware.skip,
    });
  }
}