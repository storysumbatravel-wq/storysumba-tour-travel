-- CreateTable
CREATE TABLE `TripCost` (
    `id` VARCHAR(191) NOT NULL,
    `packageSlug` VARCHAR(191) NOT NULL,
    `packageName` VARCHAR(191) NOT NULL,
    `items` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TripCost_packageSlug_key`(`packageSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
