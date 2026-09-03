import { Router } from "express";
import { OutletController } from "./outlet.controller";
import { AuthMiddleware } from "../../middlewares/auth.middlewares";
import { Role } from "../../../generated/prisma";

const router = Router()

router.use(AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.SUPER_ADMIN]))
router.get("/", OutletController.getOutlets)
router.get("/:id", OutletController.getOutletById)
router.post("/", OutletController.createOutlet)
router.patch("/:id", OutletController.updateOutlet)
router.delete("/:id/deactivate", OutletController.deactivateOutlet)

export default router