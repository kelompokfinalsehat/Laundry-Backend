import { Router } from "express";
import { RegionController } from "./region.controllers";

const router = Router();

router.get("/provinces", RegionController.getProvinces);
router.get("/cities/:provinceId", RegionController.getCities);
router.get("/districts/:cityId", RegionController.getDistricts);
router.get("/sub-districts/:districtId", RegionController.getSubDistricts);
router.post("/preview-location", RegionController.previewLocation);

export default router;
