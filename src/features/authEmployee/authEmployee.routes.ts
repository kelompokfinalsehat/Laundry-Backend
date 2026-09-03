import { Router } from "express";
import { AuthEmployeeController } from "./authEmployee.controllers";
import { AuthSessionController } from "../authShared/authSession.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";

const router = Router();

router.post("/login", AuthEmployeeController.login);
router.post("/accept-invitation", AuthEmployeeController.acceptInvitation);
router.post("/forgot-password",AuthEmployeeController.forgotPassword)
router.post("/reset-password",AuthEmployeeController.resetPasword)
router.get("/me", AuthMiddleware.authenticated(), AuthSessionController.getMe);
router.post("/logout", AuthSessionController.logout);
export default router;
