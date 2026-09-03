import { BillPaymentStatus } from "../generated/prisma";
import { prisma } from "../src/configs/prisma-client.config";

async function main() {
  console.log("🌱 Updating paidAt for paid bills...");

  const bills = await prisma.bill.findMany({
    where: {
      paymentStatus: BillPaymentStatus.PAID,
      paidAt: null,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  for (const bill of bills) {
    await prisma.bill.update({
      where: {
        id: bill.id,
      },
      data: {
        paidAt: bill.createdAt,
      },
    });
  }

  console.log(`✅ Updated ${bills.length} paid bills.`);
}

main()
  .catch((error) => {
    console.error("❌ Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });