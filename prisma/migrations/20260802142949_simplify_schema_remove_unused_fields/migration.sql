/*
  Warnings:

  - The values [CLOSED] on the enum `ComplaintStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCELLED] on the enum `DriverAssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PAUSED_OFF_HOURS] on the enum `WorkerAssignmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `auth_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `cancel_reason` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled_at` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `reassigned_from` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `cancel_reason` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `contactless_instruction` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `handover_method` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `internal_status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `availability_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `duty_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proof_photos` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `laundry_pricing_id` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price_per_kg_snapshot` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shipping_rate_id` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shipping_fee_snapshot` on table `bills` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('OFF_DUTY', 'AVAILABLE', 'BUSY');

-- AlterEnum
BEGIN;
CREATE TYPE "ComplaintStatus_new" AS ENUM ('OPEN', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."complaints" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "complaints" ALTER COLUMN "status" TYPE "ComplaintStatus_new" USING ("status"::text::"ComplaintStatus_new");
ALTER TYPE "ComplaintStatus" RENAME TO "ComplaintStatus_old";
ALTER TYPE "ComplaintStatus_new" RENAME TO "ComplaintStatus";
DROP TYPE "public"."ComplaintStatus_old";
ALTER TABLE "complaints" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DriverAssignmentStatus_new" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "driver_assignments" ALTER COLUMN "status" TYPE "DriverAssignmentStatus_new" USING ("status"::text::"DriverAssignmentStatus_new");
ALTER TYPE "DriverAssignmentStatus" RENAME TO "DriverAssignmentStatus_old";
ALTER TYPE "DriverAssignmentStatus_new" RENAME TO "DriverAssignmentStatus";
DROP TYPE "public"."DriverAssignmentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkerAssignmentStatus_new" AS ENUM ('QUEUED', 'ASSIGNED', 'IN_PROGRESS', 'ON_HOLD_BYPASS', 'COMPLETED');
ALTER TABLE "worker_assignments" ALTER COLUMN "status" TYPE "WorkerAssignmentStatus_new" USING ("status"::text::"WorkerAssignmentStatus_new");
ALTER TYPE "WorkerAssignmentStatus" RENAME TO "WorkerAssignmentStatus_old";
ALTER TYPE "WorkerAssignmentStatus_new" RENAME TO "WorkerAssignmentStatus";
DROP TYPE "public"."WorkerAssignmentStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_laundry_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_shipping_rate_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_reassigned_from_fkey";

-- DropForeignKey
ALTER TABLE "proof_photos" DROP CONSTRAINT "proof_photos_driver_assignment_id_fkey";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "laundry_pricing_id" SET NOT NULL,
ALTER COLUMN "price_per_kg_snapshot" SET NOT NULL,
ALTER COLUMN "shipping_rate_id" SET NOT NULL,
ALTER COLUMN "shipping_fee_snapshot" SET NOT NULL;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "cancel_reason",
DROP COLUMN "cancelled_at",
DROP COLUMN "reassigned_from";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "channel";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cancel_reason",
DROP COLUMN "cancelled_at",
DROP COLUMN "contactless_instruction",
DROP COLUMN "handover_method",
DROP COLUMN "internal_status";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "availability_status",
DROP COLUMN "duty_status",
ADD COLUMN     "work_status" "WorkStatus";

-- DropTable
DROP TABLE "audit_logs";

-- DropTable
DROP TABLE "proof_photos";

-- DropEnum
DROP TYPE "AvailabilityStatus";

-- DropEnum
DROP TYPE "DutyStatus";

-- DropEnum
DROP TYPE "HandoverMethod";

-- DropEnum
DROP TYPE "InternalStatus";

-- DropEnum
DROP TYPE "NotificationChannel";

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_laundry_pricing_id_fkey" FOREIGN KEY ("laundry_pricing_id") REFERENCES "laundry_pricings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_shipping_rate_id_fkey" FOREIGN KEY ("shipping_rate_id") REFERENCES "shipping_rates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
