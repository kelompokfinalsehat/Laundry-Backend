const COMPLAINT_WINDOW_HOURS = 48;

export class orderActionHelper {
  static isComplaintWindowOpen(order: {
    customerStatus: string;
    driverAssignments: { taskType: string; deliveredAt: Date | null }[];
  }): boolean {
    // BR-CMP-01: setelah delivery selesai, sebelum confirm, sebelum 2x24 jam.
    if (order.customerStatus !== "WAITING_CUSTOMER_CONFIRMATION") return false;

    const delivery = order.driverAssignments.find(
      (a) => a.taskType === "DELIVERY",
    );
    if (!delivery?.deliveredAt) return false;

    const deadline = new Date(
      delivery.deliveredAt.getTime() + COMPLAINT_WINDOW_HOURS * 60 * 60 * 1000,
    );
    return new Date() <= deadline;
  }
}
