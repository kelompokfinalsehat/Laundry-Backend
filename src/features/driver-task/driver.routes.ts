import { Router } from "express";
import { DriverController } from "./driver.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

export const DriverRoute = Router();

DriverRoute.get("/task/available", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["DRIVER"]), DriverController.getAvailableAssignments);

DriverRoute.get("/task/active", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["DRIVER"]), DriverController.getActiveAssignment);
DriverRoute.post(
  "/task/:assignmentId/claim",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["DRIVER"]),
  DriverController.claimAssignment,
);
DriverRoute.post(
  "/task/:assignmentId/start",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["DRIVER"]),
  DriverController.startAssignment,
);
DriverRoute.post(
  "/task/:assignmentId/pickup-collected",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["DRIVER"]),
  DriverController.pickupCollected,
);
DriverRoute.post(
  "/task/:assignmentId/complete-delivery",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["DRIVER"]),
  DriverController.completeDelivery,
);
DriverRoute.get("/task/history", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["DRIVER"]), DriverController.getHistoryList);
DriverRoute.get(
  "/task/history/:assignmentId",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized(["DRIVER"]),
  DriverController.getHistoryDetail,
);
