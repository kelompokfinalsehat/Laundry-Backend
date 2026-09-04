import { Router } from "express";
import { PaymentController } from "./payments.controllers";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router();

router.post(
  "/:id/payment",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  PaymentController.createPaymentAttempt,
);
router.get(
  "/:id/payment",
  AuthMiddleware.authenticated(),
  AuthMiddleware.authorized([Role.CUSTOMER]),
  PaymentController.getLatestPaymentAttempt,
);
router.post("/payment/webhook", PaymentController.MidtransWebhook);

export default router;
