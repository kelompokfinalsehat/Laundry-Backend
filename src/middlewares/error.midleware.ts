import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export const ErrorMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.log(err)
  res.status(err?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.isExpose ? err?.message : 'Internal Server Error',
    data: null,
  });

   if (err instanceof ZodError) {
    const firstError = err.issues[0];

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: firstError?.message ?? "Data tidak valid",
      data: null,
    });
  }
};