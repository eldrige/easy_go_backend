/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `renterId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_renterId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_hostId_fkey";

-- DropIndex
DROP INDEX "Booking_propertyId_checkIn_checkOut_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "checkIn",
DROP COLUMN "checkOut",
DROP COLUMN "createdAt",
DROP COLUMN "propertyId",
DROP COLUMN "renterId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Property";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "BusCompany" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "bus_company_id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusCompany_email_key" ON "BusCompany"("email");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_bus_company_id_fkey" FOREIGN KEY ("bus_company_id") REFERENCES "BusCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
