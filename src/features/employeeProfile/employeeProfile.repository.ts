import { prisma } from "../../configs/prisma-client.config";
import type { UpdateEmployeeProfileData } from "./employeeProfile.types";

export class EmployeeProfileRepository {
  static async findById(employeeId: string) {
    return await prisma.employee.findFirst({
      where: {
        id: employeeId,
        deletedAt: null,
      },
      include: {
        currentOutlet: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
  }

  static async findByEmail(email: string) {
    return await prisma.employee.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });
  }

  static async updateProfile({ employeeId, data }: { employeeId: string; data: UpdateEmployeeProfileData }) {
    return await prisma.employee.update({
      where: { id: employeeId },
      data,
      include: {
        currentOutlet: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
  }

  static async updateProfilePhoto({ employeeId, profilePhotoUrl }: { employeeId: string; profilePhotoUrl: string }) {
    return await prisma.employee.update({
      where: { id: employeeId },
      data: { profilePhotoUrl },
      select: {
        profilePhotoUrl: true,
      },
    });
  }
}
