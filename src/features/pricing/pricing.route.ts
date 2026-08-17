import { Router } from "express";
import { PricingController } from "./pricing.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get('/laundry', PricingController.getLaundryPricing)
router.post('/laundry', PricingController.createLaundryPricing)
router.patch('/laundry/:id', PricingController.updateLaundryPricing)
router.get('/shipping', PricingController.getShippingRates)
router.get('/shipping/:id', PricingController.getShippingRate)
router.post('/shipping', PricingController.createShippingRate)
router.patch('/shipping/:id', PricingController.updateShippingRate)
router.patch('/shipping/:id/deactivate', PricingController.deactivateShippingRate)

export default router