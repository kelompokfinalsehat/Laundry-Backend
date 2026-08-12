import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { OrderController } from "./order.controller";

const router = Router()

router.get("/", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), OrderController.getOrders)
router.get("/:id", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), OrderController.getOrderById)
router.post('/:id/receive', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), OrderController.receiveOrder)
router.post('/:id/create-order', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), OrderController.createOrder)

export default router