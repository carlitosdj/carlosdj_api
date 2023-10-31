CREATE TABLE `Contact` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`subject` varchar(255),
	`message` text,
	`created_at` double,
	`status` int,
	CONSTRAINT `Contact_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Support` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`created_at` double NOT NULL,
	`reply` text NOT NULL,
	`status` int NOT NULL,
	`user_id` int NOT NULL,
	`admin_id` int NOT NULL,
	CONSTRAINT `Support_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP INDEX `Component_componentId_idx` ON `Component`;--> statement-breakpoint
CREATE INDEX `Component_component_id_idx` ON `Component` (`component_id`);--> statement-breakpoint
ALTER TABLE `Support` ADD CONSTRAINT `Support_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Support` ADD CONSTRAINT `Support_admin_id_User_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;