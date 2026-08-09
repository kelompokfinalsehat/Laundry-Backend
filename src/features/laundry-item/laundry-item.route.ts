import { Router } from "express";
import { LaundryItemController } from "./laundry-item.controller";

const router = Router()

router.get('/', LaundryItemController.getLaundryItems)
router.get('/:id', LaundryItemController.getLaundryItem)
router.post('/', LaundryItemController.createLaundryItem)
router.patch('/:id', LaundryItemController.updateLaundryItem)
router.patch('/:id/deactivate', LaundryItemController.deactivateLaundryItem)

export default router