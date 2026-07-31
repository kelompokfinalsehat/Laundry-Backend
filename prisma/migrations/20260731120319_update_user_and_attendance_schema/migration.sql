/*
  Warnings:

  - A unique constraint covering the columns `[user_id,attendance_date]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CustomerStatus" ADD VALUE 'WAITING_CUSTOMER_CONFIRMATION';

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "worker_assignments" DROP CONSTRAINT "worker_assignments_worker_id_fkey";

-- DropIndex
DROP INDEX "attendances_user_id_attendance_date_idx";

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "driver_assignments" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "available_since_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "worker_assignments" ALTER COLUMN "worker_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attendances_user_id_attendance_date_key" ON "attendances"("user_id", "attendance_date");

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
