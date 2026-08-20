-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "paid_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paid_at" TIMESTAMP(3);
