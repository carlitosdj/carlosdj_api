CREATE TABLE `Annotation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` double,
	`status` int,
	`user_id` int,
	`component_id` int
);
--> statement-breakpoint
CREATE TABLE `Comment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`created_at` double,
	`status` int,
	`user_id` int,
	`component_id` int
);
--> statement-breakpoint
ALTER TABLE `Component` DROP FOREIGN KEY `Component_componentId_componentId_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` DROP FOREIGN KEY `ComponentAnnotation_componentId_componentId_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentAvailable` DROP FOREIGN KEY `ComponentAvailable_componentId_componentId_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentCompleted` DROP FOREIGN KEY `ComponentCompleted_componentId_componentId_fk`;
--> statement-breakpoint
ALTER TABLE `ComponentExtra` DROP FOREIGN KEY `ComponentExtra_componentId_componentId_fk`;
--> statement-breakpoint
DROP INDEX `Component_componentId_idx` ON `Component`;--> statement-breakpoint
ALTER TABLE `Component` ADD `component_id` int;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD `component_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` ADD `component_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD `component_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD `key_extra` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD `value_extra` text NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD `component_id` int NOT NULL;--> statement-breakpoint
CREATE INDEX `Component_componentId_idx` ON `Component` (`component_id`);--> statement-breakpoint
ALTER TABLE `Component` ADD CONSTRAINT `Component_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` ADD CONSTRAINT `ComponentAvailable_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD CONSTRAINT `ComponentExtra_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Component` DROP COLUMN `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` DROP COLUMN `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` DROP COLUMN `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` DROP COLUMN `componentId`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` DROP COLUMN `keyExtra`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` DROP COLUMN `valueExtra`;--> statement-breakpoint
ALTER TABLE `ComponentExtra` DROP COLUMN `componentId`;--> statement-breakpoint
ALTER TABLE `Annotation` ADD CONSTRAINT `Annotation_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Annotation` ADD CONSTRAINT `Annotation_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;