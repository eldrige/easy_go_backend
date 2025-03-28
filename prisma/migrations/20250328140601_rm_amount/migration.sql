/*
  Warnings:

  - You are about to drop the column `amount` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "departure_time" SET DEFAULT CURRENT_TIMESTAMP;
