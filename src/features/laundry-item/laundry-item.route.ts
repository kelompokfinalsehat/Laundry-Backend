import { Router } from "express";
import { LaundryItemController } from "./laundry-item.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated())
router.get('/', AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), LaundryItemController.getLaundryItems)
router.get('/:id', AuthMiddleware.authorized([Role.OUTLET_ADMIN, Role.SUPER_ADMIN]), LaundryItemController.getLaundryItem)
router.post('/', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.createLaundryItem)
router.patch('/:id', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.updateLaundryItem)
router.patch('/:id/deactivate', AuthMiddleware.authorized([Role.SUPER_ADMIN]), LaundryItemController.deactivateLaundryItem)

export default router