-- CreateTable
CREATE TABLE `PackagePrice` (
    `id` VARCHAR(191) NOT NULL,
    `pax` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackagePrice` ADD CONSTRAINT `PackagePrice_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
