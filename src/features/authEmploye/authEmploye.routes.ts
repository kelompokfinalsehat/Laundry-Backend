import { Router } from "express";
import { AuthEmployeController } from "./authEmploye.controllers";
import { AuthSessionController } from "../authShared/authSession.controllers";

const router = Router();

router.post("/login", AuthEmployeController.login);
router.post("/accept-invitation", AuthEmployeController.acceptInfitation);
router.post("/logout", AuthSessionController.logout);
router.post("/refresh", AuthSessionController.refresh);

export default router;
