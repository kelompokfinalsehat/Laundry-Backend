import type { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma";
export function fakeAuth(_req: Request, res: Response, next: NextFunction) {
  res.locals.payload = {
    id: "61180311-9476-4911-b665-34f28d114e8c",
    role: Role.DRIVER,
  };

  next();
}
