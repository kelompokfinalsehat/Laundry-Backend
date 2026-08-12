import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/env.config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME!,
  api_key: CLOUDINARY_API_KEY!,
  api_secret: CLOUDINARY_API_SECRET!,
});
export class CloudinaryUtil {
  static async uploadStream(file: Buffer, dirName?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          ...(dirName && { folder: `uploads/${dirName}` }), 
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }
          return resolve(result.secure_url);
        },
      )
      .end(file);
  });
}



static extractPublicId(url: string): string {
  const urlAfterUpload = url.split('/upload/')[1]?? '';
  const urlWithoutVersion = urlAfterUpload.replace(/^v\d+\//, '');
  const publicId = urlWithoutVersion.replace(/\.[^/.]+$/, '');
  return publicId;
}

static async delete(publicIds: string[]) {
    await cloudinary.api.delete_resources(publicIds);
  }
}