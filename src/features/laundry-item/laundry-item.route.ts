import { Router } from "express";
import { LaundryItemController } from "./laundry-item.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get('/', LaundryItemController.getLaundryItems)
router.get('/:id', LaundryItemController.getLaundryItem)
router.post('/', LaundryItemController.createLaundryItem)
router.patch('/:id', LaundryItemController.updateLaundryItem)
router.patch('/:id/deactivate', LaundryItemController.deactivateLaundryItem)

export default router