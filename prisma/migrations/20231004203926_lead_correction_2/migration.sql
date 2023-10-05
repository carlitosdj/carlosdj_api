/*
  Warnings:

  - A unique constraint covering the columns `[email,list]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Lead_name_email_key` ON `Lead`;

-- CreateIndex
CREATE UNIQUE INDEX `Lead_email_list_key` ON `Lead`(`email`, `list`);
