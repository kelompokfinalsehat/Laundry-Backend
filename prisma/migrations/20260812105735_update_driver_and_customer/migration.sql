/*
  Warnings:

  - You are about to drop the column `departed_at` on the `driver_assignments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "pending_email" TEXT;

-- AlterTable
ALTER TABLE "driver_assignments" DROP COLUMN "departed_at";
