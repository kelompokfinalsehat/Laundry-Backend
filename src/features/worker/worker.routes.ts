import { Router } from "express";
import { WorkerController } from "./worker.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

export const WorkerRoute = Router();

WorkerRoute.get("/available", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getAvailableAssignments);
WorkerRoute.get("/active", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getActive);
WorkerRoute.get("/history", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getHistoryList);
WorkerRoute.get("/:assignmentId/pre-claim", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getPreClaimDetail);
WorkerRoute.post("/:assignmentId/claim", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.claimAssignment);
WorkerRoute.post("/:assignmentId/validate-quantities", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.validateQuantities);
WorkerRoute.post("/:assignmentId/bypass-request", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.requestBypass);
WorkerRoute.post("/:assignmentId/complete", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.complete);
