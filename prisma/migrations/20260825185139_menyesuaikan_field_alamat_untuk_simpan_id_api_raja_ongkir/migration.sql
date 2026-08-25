/*
  Warnings:

  - Added the required column `city_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_detail` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district_id` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "district_id" TEXT NOT NULL,
ADD COLUMN     "province_id" TEXT NOT NULL,
ADD COLUMN     "street_detail" TEXT NOT NULL,
ADD COLUMN     "sub_district_id" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;
