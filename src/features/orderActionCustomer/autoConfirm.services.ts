import { prisma } from "../../configs/prisma-client.config";


const COMPLAINT_WINDOW_HOURS = 48; 

export async function runAutoConfirmJob(): Promise<{ confirmedCount: number }> {
  const deadline = new Date(Date.now() - COMPLAINT_WINDOW_HOURS * 60 * 60 * 1000);

  const candidates = await prisma.order.findMany({
    where: {
      customerStatus: "WAITING_CUSTOMER_CONFIRMATION",
      driverAssignments: {
        some: { taskType: "DELIVERY", deliveredAt: { lte: deadline } },
      },
      complaint: null,
    },
    select: { id: true },
  });

  let confirmedCount = 0;

  for (const order of candidates) {
    
    const updated = await prisma.$transaction(async (tx) => {
      const stillEligible = await tx.order.findFirst({
        where: { id: order.id, customerStatus: "WAITING_CUSTOMER_CONFIRMATION", complaint: null },
      });
      if (!stillEligible) return false;

      await tx.order.update({
        where: { id: order.id },
        data: { customerStatus: "RECEIVED_BY_CUSTOMER", completedAt: new Date() },
      });
      return true;
    });

    if (updated) confirmedCount += 1;
  }

  return { confirmedCount };
}