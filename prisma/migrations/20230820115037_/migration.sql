-- AlterTable
ALTER TABLE `users` ADD COLUMN `google_access_token` TEXT NULL,
    ADD COLUMN `google_refresh_token` TEXT NULL,
    ADD COLUMN `jwt_access_token` TEXT NULL;
