import { Router } from "express";
import { PricingController } from "./pricing.controller";

const router = Router()

// Super admin scope
router.get('/laundry', PricingController.getLaundryPricing)
router.post('/laundry', PricingController.createLaundryPricing)
router.patch('/laundry/:id', PricingController.updateLaundryPricing)
router.get('/shipping', PricingController.getShippingRates)
router.get('/shipping/:id', PricingController.getShippingRate)
router.post('/shipping', PricingController.createShippingRate)
router.patch('/shipping/:id', PricingController.updateShippingRate)
router.patch('/shipping/:id/deactivate', PricingController.deactivateShippingRate)

export default router