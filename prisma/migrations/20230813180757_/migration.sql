/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `username`,
    ADD COLUMN `firstName` VARCHAR(100) NULL,
    ADD COLUMN `lastName` VARCHAR(100) NULL,
    ADD COLUMN `userName` VARCHAR(200) NULL;
