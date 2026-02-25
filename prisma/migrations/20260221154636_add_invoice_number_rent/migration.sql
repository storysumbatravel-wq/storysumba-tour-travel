/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber]` on the table `RentBooking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rentbooking` ADD COLUMN `invoiceNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RentBooking_invoiceNumber_key` ON `RentBooking`(`invoiceNumber`);
