/*
  Warnings:

  - You are about to alter the column `first_name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `last_name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `hash` TEXT NOT NULL,
    MODIFY `first_name` VARCHAR(100) NULL,
    MODIFY `book_mark` TEXT NULL,
    MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `contact` VARCHAR(200) NOT NULL,
    MODIFY `user_name` VARCHAR(200) NULL;
