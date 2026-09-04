import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";
import { BypassController } from "./bypass.controller";

const router = Router()

router.get('/', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]), BypassController.getBypassRequests)
router.get('/:id', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN, Role.OUTLET_ADMIN]), BypassController.getBypassRequestById)
router.post('/:id/approve', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), BypassController.approve)
router.post('/:id/reject', AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.OUTLET_ADMIN]), BypassController.reject)

export default router