/*
  Warnings:

  - Added the required column `city_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_district_name` to the `customer_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_addresses" ADD COLUMN     "city_name" TEXT NOT NULL,
ADD COLUMN     "district_name" TEXT NOT NULL,
ADD COLUMN     "province_name" TEXT NOT NULL,
ADD COLUMN     "sub_district_name" TEXT NOT NULL;
