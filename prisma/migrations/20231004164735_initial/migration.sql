-- CreateTable
CREATE TABLE `LocationState` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `country` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocationCity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `state_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(60) NOT NULL,
    `auth_key` VARCHAR(255) NULL,
    `confirmed_at` INTEGER NULL,
    `blocked_at` INTEGER NULL,
    `registration_ip` VARCHAR(45) NULL,
    `created_at` DOUBLE NOT NULL,
    `updated_at` DOUBLE NULL,
    `flag` INTEGER NULL,
    `last_login_at` DOUBLE NULL,
    `origin` VARCHAR(255) NULL,
    `num_turma` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `bio` TEXT NULL,
    `whatsapp` VARCHAR(255) NULL,
    `cpf` VARCHAR(255) NULL,
    `postalCode` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `addressNumber` VARCHAR(255) NULL,
    `addressDistrict` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `city_id` INTEGER NULL,
    `state_id` INTEGER NULL,
    `roles` VARCHAR(60) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `order` INTEGER NULL,
    `duration` INTEGER NULL,
    `tags` VARCHAR(255) NULL,
    `orderby` VARCHAR(255) NULL,
    `component_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentExtra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key_extra` VARCHAR(100) NOT NULL,
    `value_extra` TEXT NOT NULL,
    `created_at` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `component_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentAvailable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `turma_num` VARCHAR(255) NOT NULL,
    `available_date` DATETIME(3) NOT NULL,
    `component_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentAnnotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `created_at` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `component_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentCompleted` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DOUBLE NOT NULL,
    `rate` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `component_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(255) NOT NULL,
    `list` VARCHAR(100) NOT NULL,
    `confirm` INTEGER NOT NULL,
    `segmentacao` VARCHAR(100) NOT NULL,
    `created_at` DOUBLE NOT NULL,
    `confirmed_at` DATETIME(3) NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `naoperturbe` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `list` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DOUBLE NULL,
    `status` INTEGER NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WppCamp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `slug` VARCHAR(255) NULL,
    `maxclicks` INTEGER NULL,
    `created_at` DOUBLE NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WppGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `clicks` INTEGER NULL,
    `created_at` DOUBLE NULL,
    `status` INTEGER NULL,
    `camp_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LocationCity` ADD CONSTRAINT `LocationCity_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `LocationState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `LocationCity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `LocationState`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentExtra` ADD CONSTRAINT `ComponentExtra_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentAvailable` ADD CONSTRAINT `ComponentAvailable_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_component_id_fkey` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadEmail` ADD CONSTRAINT `LeadEmail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WppGroup` ADD CONSTRAINT `WppGroup_camp_id_fkey` FOREIGN KEY (`camp_id`) REFERENCES `WppCamp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
