import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { CloudinaryUtil } from "../../utils/cloudinary.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeProfileHelper } from "./employeeProfile.helper";
import { EmployeeProfileRepository } from "./employeeProfile.repository";
import type { UpdateEmployeeProfileData } from "./employeeProfile.types";
import type { UpdateEmployeeProfileInput } from "./employeeProfile.types";

export class EmployeeProfileService {
  static async getProfile({ employeeId }: { employeeId: string }) {
    const employee = await EmployeeProfileRepository.findById(employeeId);
    EmployeeProfileHelper.assertEmployee(employee);
    return EmployeeProfileHelper.buildProfileResponse(employee);
  }

  static async updateProfile({ employeeId, body }: { employeeId: string; body: UpdateEmployeeProfileInput["body"] }) {
    const employee = await EmployeeProfileRepository.findById(employeeId);
    EmployeeProfileHelper.assertEmployee(employee);
    let hashedPassword: string | undefined
    if(body.newPassword){
      const isCurrentPasswordValid = await BcryptUtil.compare(body.currentPassword!, employee.passwordHash!)
      if(!isCurrentPasswordValid) throw new ResponseError('CURRENT_PASSWORD_INVALID')
      hashedPassword = await BcryptUtil.hash(body.newPassword)
    }
    const updateData: UpdateEmployeeProfileData = {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.phone !== undefined && { phone: body.phone }),
      ...(hashedPassword && {passwordHash: hashedPassword} )
    };
    const updatedEmployee = await EmployeeProfileRepository.updateProfile({ employeeId: employee.id, data: updateData });
    return EmployeeProfileHelper.buildProfileResponse(updatedEmployee);
  }

  static async updateProfilePhoto({ employeeId, file }: { employeeId: string; file: Express.Multer.File }) {
    const employee = await EmployeeProfileRepository.findById(employeeId);
    EmployeeProfileHelper.assertEmployee(employee);

    const previousPhotoUrl = employee.profilePhotoUrl;
    const profilePhotoUrl = await CloudinaryUtil.uploadStream(file.buffer, "employees");
    const updatedPhoto = await EmployeeProfileRepository.updateProfilePhoto({ employeeId: employee.id, profilePhotoUrl });
    if (previousPhotoUrl) {
      const previousPublicId = CloudinaryUtil.extractPublicId(previousPhotoUrl);
      if (previousPublicId) {
        await CloudinaryUtil.delete([previousPublicId]);
      }
    }
    return updatedPhoto;
  }
}
