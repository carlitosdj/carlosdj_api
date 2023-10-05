/*
  Warnings:

  - The `confirmed_at` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name,email]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Lead` MODIFY `whatsapp` VARCHAR(255) NULL,
    MODIFY `list` VARCHAR(100) NULL,
    MODIFY `confirm` INTEGER NULL,
    MODIFY `segmentacao` VARCHAR(100) NULL,
    MODIFY `created_at` DOUBLE NULL,
    DROP COLUMN `confirmed_at`,
    ADD COLUMN `confirmed_at` DOUBLE NULL,
    MODIFY `origin` VARCHAR(255) NULL,
    MODIFY `naoperturbe` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Lead_name_email_key` ON `Lead`(`name`, `email`);
