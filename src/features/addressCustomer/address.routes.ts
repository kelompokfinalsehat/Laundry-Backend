import { Router } from "express";
import { AddressController } from "./address.controller";

const router = Router();

router.post("/", AddressController.create);
router.get("/", AddressController.getAddress);
router.patch("/:id", AddressController.update);
router.delete("/:id", AddressController.delete);
router.patch("/:id/set-primary", AddressController.setPrimary);

export default router;
