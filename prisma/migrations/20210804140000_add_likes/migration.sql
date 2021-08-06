/*
  Warnings:

  - You are about to drop the column `uuid` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `comments.uuid_unique` ON `comments`;

-- DropIndex
DROP INDEX `posts.uuid_unique` ON `posts`;

-- DropIndex
DROP INDEX `users.uuid_unique` ON `users`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `uuid`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `uuid`,
    ADD COLUMN `likeCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `uuid`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `_LikedPosts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LikedPosts_AB_unique`(`A`, `B`),
    INDEX `_LikedPosts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LikedPosts` ADD FOREIGN KEY (`A`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LikedPosts` ADD FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
