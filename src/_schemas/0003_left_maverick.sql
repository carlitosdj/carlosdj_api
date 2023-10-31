CREATE TABLE `ComponentComment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`comment` text NOT NULL,
	`created_at` double NOT NULL,
	`status` int NOT NULL,
	`user_id` int NOT NULL,
	`component_id` int NOT NULL
);
--> statement-breakpoint
DROP TABLE `Annotation`;--> statement-breakpoint
DROP TABLE `Comment`;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD CONSTRAINT `ComponentComment_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentComment` ADD CONSTRAINT `ComponentComment_component_id_Component_id_fk` FOREIGN KEY (`component_id`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;