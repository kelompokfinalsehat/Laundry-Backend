import { Router } from "express";
import { fakeAuth } from "../../middlewares/fake-auth.middleware";
import { DriverController } from "./driver.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

export const DriverRoute = Router();

DriverRoute.get(
  "/available",
  
  // Authmiddleware.authenticated(),
  // AuthMiddleware.authorized[Role.DRIVER]
  // DriverController.getAvailableAssignment,
);

DriverRoute.post("/:assignmentId/claim", fakeAuth, DriverController.claimAssignment);
DriverRoute.get("/active", fakeAuth, DriverController.getActiveAssignment);
DriverRoute.post("/:assignmentId/start", fakeAuth, DriverController.startAssignment);
DriverRoute.post("/:assignmentId/pickup-collected", fakeAuth, DriverController.pickupCollected);
DriverRoute.post("/:assignmentId/complete-delivery", fakeAuth, DriverController.completeDelivery);
DriverRoute.get("/history", fakeAuth, DriverController.getHistoryList);
DriverRoute.get("/history/:assignmentId", fakeAuth, DriverController.getHistoryDetail);
