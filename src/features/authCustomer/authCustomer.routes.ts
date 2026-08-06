import { Router } from "express";
import { AuthCustomerController } from "./authCustomer.controllers";
import { AuthSessionController } from "../authShared/authShared.controllers";

const router = Router();

router.post("/register", AuthCustomerController.register);
router.post("/verify-email", AuthCustomerController.verifyCustomerEmail);
router.post("/resend-verification", AuthCustomerController.resendVerification);
router.post("/login", AuthCustomerController.login);
router.post("/login/google",AuthCustomerController.loginGoogle);
router.post("/logout", AuthSessionController.logout);
router.post("/refresh", AuthSessionController.refresh);
export default router;
