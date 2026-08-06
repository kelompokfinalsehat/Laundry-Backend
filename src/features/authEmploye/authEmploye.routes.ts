import { Router } from "express";
import { AuthEmployeController } from "./authEmploye.controllers";

const router = Router();

router.post("/register", AuthEmployeController.register);
router.post("/login", AuthEmployeController.login);

export default router;
