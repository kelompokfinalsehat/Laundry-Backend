import { prisma } from "../../configs/prisma-client.config";
import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { CloudinaryUtil } from "../../utils/cloudinary.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { UpdateProfileInput } from "./profile.validation";

export class CustomerProfileService {
  static async updateCustomerProfile(
    payload: userPayload,
    { body }: UpdateProfileInput,
  ) { 
    
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });
   
    let passwordHash: string | undefined;

    if (body.newPassword) {
      // BR-AUTH-05: akun Google nggak punya password lokal, nggak bisa ganti password di sini.
      if (customer.authProvider !== "EMAIL" || !customer.passwordHash) {
        throw new ResponseError(
          "GOOGLE_ACCOUNT_NO_PASSWORD",
          "Akun Google tidak memiliki password lokal.",
        );
      }

      const isCurrentPasswordValid = await BcryptUtil.compare(
        body.currentPassword!,
        customer.passwordHash,
      );
      if (!isCurrentPasswordValid) {
        throw new ResponseError("CURRENT_PASSWORD_INVALID");
      }

      passwordHash = await BcryptUtil.hash(body.newPassword);
    }

    const updated = await prisma.customer.update({
      where: { id: payload.sub },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(passwordHash !== undefined && { passwordHash }),
      },
    });

    return {
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      profilePhotoUrl: updated.profilePhotoUrl,
    };
  }
  static async updateCustomerProfilePhoto(
    payload: userPayload,
    file: Express.Multer.File,
  ) {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    const previousPhotoUrl = customer.profilePhotoUrl;

    const profilePhotoUrl = await CloudinaryUtil.uploadStream(
      file.buffer,
      "customers",
    );

    const updated = await prisma.customer.update({
      where: { id: payload.sub },
      data: { profilePhotoUrl },
    });

    if (previousPhotoUrl) {
      const previousPublicId = CloudinaryUtil.extractPublicId(previousPhotoUrl);
      if (previousPublicId) {
        await CloudinaryUtil.delete([previousPublicId]);
      }
    }
    return { profilePhotoUrl: updated.profilePhotoUrl };
  }
  static async requestEmailChange() {}
  static async confirmEmailChange() {}
}
