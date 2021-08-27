/*
  Warnings:

  - Made the column `body` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `text` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `posts` MODIFY `body` TEXT NOT NULL;
