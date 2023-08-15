/*
  Warnings:

  - Added the required column `contact` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NULL;
