/**
 * error-handler.middleware.ts
 *
 * Middleware global penangkap SEMUA error di aplikasi. Dipasang SEKALI di
 * entry point (app.ts / server.ts), setelah semua route terdaftar:
 *
 *   app.use(errorHandler);
 *
 * Menangani 4 sumber error:
 *   1. ResponseError    -> error bisnis yang sengaja di-throw (lihat response-error.util.ts)
 *   2. ZodError          -> gagal validasi input (lihat validation.ts)
 *   3. Prisma error      -> constraint violation (unique, record not found, dst)
 *   4. Error lain / bug  -> fallback 500, detail tidak dibocorkan ke client
 *
 * Format response mengikuti Popo_Laundry_API_Contract_Fitur_1_2_3_v2_0.md
 * bagian 2.6 (Error response).
 */

import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma"; // sesuaikan path output prisma client di project kalian
import { ResponseError } from "../utils/errors/response-error.utils";
import { logger } from "../configs/logger.config"; // sesuaikan path file logger kamu

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = err instanceof Error ? err.message : String(err);

  // ResponseError adalah error yang sengaja dilempar (expected), jadi cukup warn.
  // Selain itu dianggap bug tak terduga, jadi di-log sebagai error.
  if (err instanceof ResponseError) {
    logger.warn(message, {
      path: req.originalUrl,
      code: err.code,
    });
  } else {
    logger.error(message, {
      path: req.originalUrl,
      ...(err instanceof Error ? { stack: err.stack } : {}),
    });
  }

  // 1. Error validasi Zod (biasanya dari validate() di validation.ts)
  if (err instanceof ZodError) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Data yang dikirim tidak valid.",
        data: null,
      },
    });
  }

  // 2. Error bisnis yang sengaja di-throw lewat ResponseError
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields ? { fields: err.fields } : {}),
      },
    });
  }

  // 3. Error dari Prisma (unique constraint, record not found, dst).
  // Ini SERING terjadi di Popo Laundry karena banyak constraint unik:
  // - email unik saat register
  // - @@unique([userId, attendanceDate]) saat clock-in dobel
  // - gatewayOrderId/midtransTransactionId unik saat payment
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: "Data sudah ada (duplikat).",
        },
      });
    }

    if (err.code === "P2025") {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
          code: "RESOURCE_NOT_FOUND",
          message: "Data tidak ditemukan.",
        },
      });
    }
  }

  // 4. Fallback: error tak terduga / bug. Jangan bocorkan detail internal.
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan pada server.",
    },
  });
}
