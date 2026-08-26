import { Router } from "express";
import { WorkerController } from "./worker.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

export const WorkerRoute = Router();

WorkerRoute.get("/jobs/available", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getAvailableAssignments);
WorkerRoute.get("/jobs/active", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getActive);
WorkerRoute.get("/jobs/history", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getHistoryList);
WorkerRoute.get("/jobs/history-count", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getHistoryCount);
WorkerRoute.get("/jobs/history/:assignmentId", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.getHistoryDetail);
WorkerRoute.post("/jobs/:assignmentId/claim", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.claimAssignment);
WorkerRoute.post("/jobs/:assignmentId/validate-quantities", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.validateQuantities);
WorkerRoute.post("/jobs/:assignmentId/bypass-requests", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.requestBypass);
WorkerRoute.post("/jobs/:assignmentId/complete", AuthMiddleware.authenticated(), AuthMiddleware.authorized(["WORKER"]), WorkerController.complete);
