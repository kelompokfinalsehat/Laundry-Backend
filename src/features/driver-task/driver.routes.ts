import { Router } from "express";
import { fakeAuth } from "../../middlewares/fake-auth.middleware";
import { DriverController } from "./driver.controllers";

export const DriverRoute = Router();

DriverRoute.get(
  "/available",
  fakeAuth,
  //Authmiddleware.authenticated
  //Authmiddleware.authorized[Role.DRIVER]
  DriverController.getAvailableAssignment,
);

DriverRoute.post("/:assignmentId/claim", fakeAuth, DriverController.claimAssignment);

DriverRoute.get("/active", fakeAuth, DriverController.getActiveAssignment);

DriverRoute.post("/:assignmentId/start", fakeAuth, DriverController.startAssignment);
