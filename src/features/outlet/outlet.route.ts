import { Router } from "express";
import { OutletController } from "./outlet.controller";

const router = Router()

router.get("/", OutletController.getOutlets)
router.get("/:id", OutletController.getOutletById)
router.post("/", OutletController.createOutlet)
router.patch("/:id", OutletController.udpateOutlet)
router.patch("/:id/deactivate", OutletController.deactivateOutlet)

export default router