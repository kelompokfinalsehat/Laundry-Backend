/*
  Warnings:

  - You are about to drop the column `user_id` on the `attendances` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `auth_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `queued_at` on the `driver_assignments` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `queued_at` on the `worker_assignments` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[employee_id,attendance_date]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outlet_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_role` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickup_scheduled_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CustomerStatus" ADD VALUE 'SCHEDULED';
ALTER TYPE "CustomerStatus" ADD VALUE 'OVERDUE';

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_user_id_fkey";

-- DropForeignKey
ALTER TABLE "auth_tokens" DROP CONSTRAINT "auth_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bypass_requests" DROP CONSTRAINT "bypass_requests_decided_by_fkey";

-- DropForeignKey
ALTER TABLE "bypass_requests" DROP CONSTRAINT "bypass_requests_requested_by_fkey";

-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_handled_by_fkey";

-- DropForeignKey
ALTER TABLE "customer_addresses" DROP CONSTRAINT "customer_addresses_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "driver_assignments" DROP CONSTRAINT "driver_assignments_driver_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_order_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_received_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_current_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "worker_assignments" DROP CONSTRAINT "worker_assignments_worker_id_fkey";

-- DropIndex
DROP INDEX "attendances_user_id_attendance_date_key";

-- DropIndex
DROP INDEX "auth_tokens_user_id_type_idx";

-- DropIndex
DROP INDEX "notifications_user_id_is_read_idx";

-- DropIndex
DROP INDEX "worker_assignments_outlet_id_station_type_status_idx";

-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "user_id",
ADD COLUMN     "employee_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "user_id",
ADD COLUMN     "customer_id" UUID,
ADD COLUMN     "employee_id" UUID;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "queued_at";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "is_read",
DROP COLUMN "order_id",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "outlet_id" UUID NOT NULL,
ADD COLUMN     "target_role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "pickup_scheduled_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "worker_assignments" DROP COLUMN "queued_at";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "NotificationType";

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "auth_provider" "AuthProvider" NOT NULL DEFAULT 'EMAIL',
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "profile_photo_url" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" "Role" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "profile_photo_url" TEXT,
    "phone" TEXT,
    "account_status" "AccountStatus" NOT NULL,
    "work_status" "WorkStatus",
    "available_since_at" TIMESTAMP(3),
    "current_outlet_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE INDEX "employees_role_idx" ON "employees"("role");

-- CreateIndex
CREATE INDEX "employees_role_current_outlet_id_idx" ON "employees"("role", "current_outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendances_employee_id_attendance_date_key" ON "attendances"("employee_id", "attendance_date");

-- CreateIndex
CREATE INDEX "auth_tokens_customer_id_type_idx" ON "auth_tokens"("customer_id", "type");

-- CreateIndex
CREATE INDEX "auth_tokens_employee_id_type_idx" ON "auth_tokens"("employee_id", "type");

-- CreateIndex
CREATE INDEX "bills_created_at_idx" ON "bills"("created_at");

-- CreateIndex
CREATE INDEX "notifications_target_role_outlet_id_sent_at_idx" ON "notifications"("target_role", "outlet_id", "sent_at");

-- CreateIndex
CREATE INDEX "orders_pickup_scheduled_at_idx" ON "orders"("pickup_scheduled_at");

-- CreateIndex
CREATE INDEX "worker_assignments_outlet_id_status_idx" ON "worker_assignments"("outlet_id", "status");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_current_outlet_id_fkey" FOREIGN KEY ("current_outlet_id") REFERENCES "outlets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_addresses" ADD CONSTRAINT "customer_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_assignments" ADD CONSTRAINT "driver_assignments_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_assignments" ADD CONSTRAINT "worker_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bypass_requests" ADD CONSTRAINT "bypass_requests_decided_by_fkey" FOREIGN KEY ("decided_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_handled_by_fkey" FOREIGN KEY ("handled_by") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
