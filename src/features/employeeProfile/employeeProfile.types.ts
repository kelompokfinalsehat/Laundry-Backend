import * as z from "zod";

import type { Prisma, Role, WorkStatus } from "../../../generated/prisma";
import type { EmployeeProfileValidation } from "./employeeProfile.validation";

export type UpdateEmployeeProfileInput = z.infer<typeof EmployeeProfileValidation.UPDATE_PROFILE>;

export type EmployeeProfileEntity = Prisma.EmployeeGetPayload<{
  include: {
    currentOutlet: {
      select: {
        id: true;
        name: true;
        address: true;
      };
    };
  };
}>;

export type EmployeeProfileResponse = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profilePhotoUrl: string | null;
  role: Role;
  workStatus: WorkStatus | null;
  currentOutletId: string | null;
  currentOutlet: {
    id: string;
    name: string;
    address: string;
  } | null;
};

export type UpdateEmployeeProfileData = {
  name?: string;
  phone?: string;
  passwordHash?: string
};
