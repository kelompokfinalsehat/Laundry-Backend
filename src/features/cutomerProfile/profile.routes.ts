import { Router } from "express";
import { MulterMiddleware } from "../../middlewares/multer.middleware";
import { CustomerProfileController } from "./profile.controllers";

<<<<<<< HEAD
const router = Router()
=======
const router = Router();
>>>>>>> a3c40c7 (feat(customer-profile): implement update profile and profile photo)

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const multerUploads = new MulterMiddleware(
<<<<<<< HEAD
  ["image/jpeg", "image/png", "image/jpg","image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

router.patch("/me",CustomerProfileController.updateCustomerProfile)
router.patch("/photo",multerUploads.single("PROFILE_PHOTO"),CustomerProfileController.updateCustomerProfilePhoto)



export default router;
=======
  ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  "memoryStorage",
).upload(MAX_FILE_SIZE);

router.patch("/me", CustomerProfileController.updateCustomerProfile);
router.patch(
  "/photo",
  multerUploads.single("PROFILE_PHOTO"),
  CustomerProfileController.updateCustomerProfilePhoto,
);
router.patch("/email", CustomerProfileController.requestEmailChange);
router.post("/email/confirm", CustomerProfileController.confirmEmailChange)

export default router;
>>>>>>> a3c40c7 (feat(customer-profile): implement update profile and profile photo)
