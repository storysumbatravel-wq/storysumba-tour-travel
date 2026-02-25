/*
  Warnings:

  - You are about to alter the column `duration` on the `package` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `packageName` on the `tripbooking` table. All the data in the column will be lost.
  - You are about to drop the `packageprice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tripcost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pax` to the `TripBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerPax` to the `TripBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `TripBooking` table without a default value. This is not possible if the table is not empty.
  - Made the column `packageId` on table `tripbooking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `packageprice` DROP FOREIGN KEY `PackagePrice_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `tripbooking` DROP FOREIGN KEY `TripBooking_packageId_fkey`;

-- AlterTable
ALTER TABLE `package` ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `duration` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tripbooking` DROP COLUMN `packageName`,
    ADD COLUMN `pax` INTEGER NOT NULL,
    ADD COLUMN `pricePerPax` INTEGER NOT NULL,
    ADD COLUMN `totalCost` INTEGER NOT NULL,
    MODIFY `packageId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `packageprice`;

-- DropTable
DROP TABLE `tripcost`;

-- CreateTable
CREATE TABLE `PackageOption` (
    `id` VARCHAR(191) NOT NULL,
    `pax` INTEGER NOT NULL,
    `pricePerPax` INTEGER NOT NULL,
    `totalCost` INTEGER NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PackageOption_packageId_pax_key`(`packageId`, `pax`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Package_slug_key` ON `Package`(`slug`);

-- AddForeignKey
ALTER TABLE `PackageOption` ADD CONSTRAINT `PackageOption_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripBooking` ADD CONSTRAINT `TripBooking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
