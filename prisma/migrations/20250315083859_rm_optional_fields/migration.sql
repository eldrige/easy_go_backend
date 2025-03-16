/*
  Warnings:

  - The values [IDLE] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[user_id,schedule_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `BusCompany` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Route` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'REJECTED');
ALTER TABLE "Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_bus_company_id_fkey";

-- AlterTable
ALTER TABLE "BusCompany" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_user_id_booking_date_idx" ON "Booking"("user_id", "booking_date");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_user_id_schedule_id_key" ON "Booking"("user_id", "schedule_id");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_bus_company_id_fkey" FOREIGN KEY ("bus_company_id") REFERENCES "BusCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
