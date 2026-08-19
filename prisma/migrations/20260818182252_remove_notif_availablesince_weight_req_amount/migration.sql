/*
  Warnings:

  - You are about to drop the column `available_since_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `weight_kg` on table `bills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_amount` on table `bills` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_outlet_id_fkey";

-- AlterTable
ALTER TABLE "bills" ALTER COLUMN "weight_kg" SET NOT NULL,
ALTER COLUMN "total_amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "available_since_at";

-- DropTable
DROP TABLE "notifications";
