import { Router } from "express";
import { WorkerController } from "./worker.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
export const WorkerRoute = Router();

WorkerRoute.get(
  "/available", //fakeAuth,
  AuthMiddleware.authenticated,
  AuthMiddleware.authorized(["worker"]),
  WorkerController.getAvailableAssignments,
);
