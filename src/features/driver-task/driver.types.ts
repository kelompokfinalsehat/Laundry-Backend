import * as zod from "zod";
import { DriverValidation } from "./driver.validation";
import type { DriverRepository } from "./driver.repository";

export type DriverAvailableListInput = zod.infer<typeof DriverValidation.AVAILABLE_ASSIGNMENT>;
export type DriverClaimInput = zod.infer<typeof DriverValidation.CLAIM_ASSIGNMENT>;
export type DriverStartInput = zod.infer<typeof DriverValidation.START_ASSIGNMENT>;
export type DriverPickupInput = zod.infer<typeof DriverValidation.PICKUP>;
export type DriverCompleteDeliveryInput = zod.infer<typeof DriverValidation.COMPLETE_DELIVERY>;
export type DriverHistoryListInput = zod.infer<typeof DriverValidation.HISTORY_LIST>;
export type DriverHistoryDetailInput = zod.infer<typeof DriverValidation.HISTORY_DETAIL>;
export type DriverActiveAssignmentDetail = NonNullable<Awaited<ReturnType<typeof DriverRepository.findActiveAssignmentDetail>>>;

export type DriverActiveState = "PICKUP_ASSIGNED" | "PICKUP_TO_CUSTOMER" | "PICKUP_TO_OUTLET" | "DELIVERY_ASSIGNED" | "DELIVERY_TO_CUSTOMER";
