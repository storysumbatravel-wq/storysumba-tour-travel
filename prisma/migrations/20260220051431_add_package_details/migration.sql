-- AlterTable
ALTER TABLE `package` ADD COLUMN `exclude` TEXT NULL,
    ADD COLUMN `include` TEXT NULL,
    ADD COLUMN `itinerary` TEXT NULL;
