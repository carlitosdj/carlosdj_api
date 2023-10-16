/*
  Warnings:

  - You are about to drop the `LeadEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LeadEmail` DROP FOREIGN KEY `LeadEmail_user_id_fkey`;

-- DropTable
DROP TABLE `LeadEmail`;

-- CreateTable
CREATE TABLE `MassMail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `list` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DOUBLE NULL,
    `status` INTEGER NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MassMail` ADD CONSTRAINT `MassMail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
