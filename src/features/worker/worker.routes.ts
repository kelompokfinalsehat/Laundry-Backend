import { Router } from "express";
import { WorkerController } from "./worker.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
export const WorkerRoute = Router();

WorkerRoute.get(
  "/available", //fakeAuth,
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER"]),
  WorkerController.getAvailableAssignments,
);
WorkerRoute.get(
  "/:assignmentId",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["WORKER"]),
  WorkerController.getAssignmentDetail,
);
