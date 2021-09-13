/*
  Warnings:

  - Added the required column `excerpt` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `allowComments` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `excerpt` VARCHAR(255) NOT NULL,
    ADD COLUMN `previewUrl` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `url` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `published` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `certification` ENUM('OPEN_WATER', 'ADVANCED', 'RESCUE', 'DIVEMASTER', 'INSTRUCTOR') NOT NULL DEFAULT 'OPEN_WATER',
    ADD COLUMN `url` VARCHAR(255) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `valid` BOOLEAN NOT NULL DEFAULT true,
    `userId` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `emitterId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL DEFAULT 0,
    `commentId` INTEGER NOT NULL DEFAULT 0,
    `message` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokens` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
