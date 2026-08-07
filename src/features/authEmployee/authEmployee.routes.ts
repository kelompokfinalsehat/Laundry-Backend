import { Router } from "express";
import { AuthEmployeeController } from "./authEmployee.controllers";
import { AuthSessionController } from "../authShared/authSession.controllers";

const router = Router();

router.post("/login", AuthEmployeeController.login);
router.post("/accept-invitation", AuthEmployeeController.acceptInvitation);
router.post("/forgot-password",AuthEmployeeController.forgotPassword)
router.post("/reset-password",AuthEmployeeController.resetPasword)
router.post("/logout", AuthSessionController.logout);
router.post("/refresh", AuthSessionController.refresh);

export default router;
