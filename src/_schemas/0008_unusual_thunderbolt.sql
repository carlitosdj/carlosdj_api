CREATE TABLE `ComponentAccess` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`status` varchar(10) DEFAULT '1',
	`userId` int NOT NULL,
	`componentId` int NOT NULL,
	CONSTRAINT `ComponentAccess_id` PRIMARY KEY(`id`),
	CONSTRAINT `AccessUserComponent` UNIQUE(`userId`,`componentId`)
);
--> statement-breakpoint
ALTER TABLE `Component` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `Component` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` RENAME COLUMN `user_id` TO `userId`;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` RENAME COLUMN `turma_num` TO `turmaNum`;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` RENAME COLUMN `available_date` TO `availableDate`;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentComment` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `ComponentComment` RENAME COLUMN `user_id` TO `userId`;--> statement-breakpoint
ALTER TABLE `ComponentComment` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` RENAME COLUMN `user_id` TO `userId`;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` RENAME COLUMN `key_extra` TO `keyExtra`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` RENAME COLUMN `value_extra` TO `valueExtra`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` RENAME COLUMN `component_id` TO `componentId`;--> statement-breakpoint
ALTER TABLE `Contact` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `Lead` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `Lead` RENAME COLUMN `confirmed_at` TO `confirmedAt`;--> statement-breakpoint
ALTER TABLE `LocationCity` RENAME COLUMN `state_id` TO `stateId`;--> statement-breakpoint
ALTER TABLE `MassMail` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `MassMail` RENAME COLUMN `user_id` TO `userId`;--> statement-breakpoint
ALTER TABLE `Support` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `Support` RENAME COLUMN `replied_at` TO `repliedAt`;--> statement-breakpoint
ALTER TABLE `Support` RENAME COLUMN `user_id` TO `userId`;--> statement-breakpoint
ALTER TABLE `Support` RENAME COLUMN `admin_id` TO `adminId`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `password_hash` TO `passwordHash`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `auth_key` TO `authKey`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `confirmed_at` TO `confirmedAt`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `blocked_at` TO `blockedAt`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `registration_ip` TO `registrationIp`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `updated_at` TO `updatedAt`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `last_login_at` TO `lastLoginAt`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `num_turma` TO `numTurma`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `city_id` TO `cityId`;--> statement-breakpoint
ALTER TABLE `User` RENAME COLUMN `state_id` TO `stateId`;--> statement-breakpoint
ALTER TABLE `WppCamp` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `WppGroup` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `WppGroup` RENAME COLUMN `camp_id` TO `campId`;--> statement-breakpoint
ALTER TABLE `Component` DROP FOREIGN KEY `Component_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` DROP FOREIGN KEY `ComponentAnnotation_user_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` DROP FOREIGN KEY `ComponentAnnotation_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentAvailable` DROP FOREIGN KEY `ComponentAvailable_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentComment` DROP FOREIGN KEY `ComponentComment_user_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentComment` DROP FOREIGN KEY `ComponentComment_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentCompleted` DROP FOREIGN KEY `ComponentCompleted_user_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentCompleted` DROP FOREIGN KEY `ComponentCompleted_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentExtra` DROP FOREIGN KEY `ComponentExtra_component_id_Component_id_fk`;
--> statement-breakpoint
ALTER TABLE `LocationCity` DROP FOREIGN KEY `LocationCity_state_id_LocationState_id_fk`;
--> statement-breakpoint
ALTER TABLE `MassMail` DROP FOREIGN KEY `MassMail_user_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `Support` DROP FOREIGN KEY `Support_user_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `Support` DROP FOREIGN KEY `Support_admin_id_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `User` DROP FOREIGN KEY `User_city_id_LocationCity_id_fk`;
--> statement-breakpoint
ALTER TABLE `User` DROP FOREIGN KEY `User_state_id_LocationState_id_fk`;
--> statement-breakpoint
ALTER TABLE `WppGroup` DROP FOREIGN KEY `WppGroup_camp_id_WppCamp_id_fk`;
--> statement-breakpoint
DROP INDEX `Component_component_id_idx` ON `Component`;--> statement-breakpoint
ALTER TABLE `Component` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `Component` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `ComponentComment` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `ComponentComment` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `ComponentExtra` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `ComponentExtra` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Contact` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `Contact` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Lead` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Lead` MODIFY COLUMN `confirmedAt` datetime(3);--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Support` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `Support` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Support` MODIFY COLUMN `repliedAt` datetime(3);--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `confirmedAt` datetime(3);--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `blockedAt` datetime(3);--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `lastLoginAt` datetime(3);--> statement-breakpoint
ALTER TABLE `WppCamp` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `WppCamp` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `status` varchar(10) DEFAULT '1';--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
ALTER TABLE `Component` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD `parentId` int;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD `timeWatched` float;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `Contact` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `Lead` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `MassMail` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `Support` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `WppCamp` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `WppGroup` ADD `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
CREATE INDEX `Component_componentId_idx` ON `Component` (`componentId`);--> statement-breakpoint
CREATE INDEX `Component_componentId_idx` ON `ComponentComment` (`parentId`);--> statement-breakpoint
ALTER TABLE `Component` ADD CONSTRAINT `Component_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` ADD CONSTRAINT `ComponentAvailable_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD CONSTRAINT `ComponentComment_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD CONSTRAINT `ComponentComment_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD CONSTRAINT `ComponentComment_parentId_ComponentComment_id_fk` FOREIGN KEY (`parentId`) REFERENCES `ComponentComment`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD CONSTRAINT `ComponentExtra_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `LocationCity` ADD CONSTRAINT `LocationCity_stateId_LocationState_id_fk` FOREIGN KEY (`stateId`) REFERENCES `LocationState`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `MassMail` ADD CONSTRAINT `MassMail_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Support` ADD CONSTRAINT `Support_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Support` ADD CONSTRAINT `Support_adminId_User_id_fk` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `User_cityId_LocationCity_id_fk` FOREIGN KEY (`cityId`) REFERENCES `LocationCity`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `User_stateId_LocationState_id_fk` FOREIGN KEY (`stateId`) REFERENCES `LocationState`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `WppGroup` ADD CONSTRAINT `WppGroup_campId_WppCamp_id_fk` FOREIGN KEY (`campId`) REFERENCES `WppCamp`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAccess` ADD CONSTRAINT `ComponentAccess_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAccess` ADD CONSTRAINT `ComponentAccess_componentId_Component_id_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;