/*
  Warnings:

  - Made the column `body` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `body` VARCHAR(191) NOT NULL;
