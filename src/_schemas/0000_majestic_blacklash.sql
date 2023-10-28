-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Component` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`created_at` double,
	`status` int(11) NOT NULL DEFAULT 1,
	`order` varchar(191),
	`duration` int(11),
	`tags` varchar(255),
	`orderby` varchar(255),
	`componentId` int(11)
);
--> statement-breakpoint
CREATE TABLE `ComponentAnnotation` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`created_at` double NOT NULL,
	`status` int(11) NOT NULL,
	`user_id` int(11) NOT NULL,
	`componentId` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ComponentAvailable` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`turma_num` varchar(255) NOT NULL,
	`available_date` datetime(3) NOT NULL,
	`componentId` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ComponentCompleted` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`created_at` double NOT NULL,
	`rate` int(11) NOT NULL,
	`status` int(11) NOT NULL,
	`user_id` int(11) NOT NULL,
	`componentId` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ComponentExtra` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`keyExtra` varchar(100) NOT NULL,
	`valueExtra` text NOT NULL,
	`created_at` double,
	`status` int(11),
	`componentId` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Lead` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(191) NOT NULL,
	`whatsapp` varchar(255),
	`list` varchar(100),
	`confirm` int(11),
	`segmentacao` varchar(100),
	`created_at` double,
	`origin` varchar(255),
	`naoperturbe` int(11),
	`confirmed_at` double,
	CONSTRAINT `Lead_email_list_key` UNIQUE(`email`,`list`)
);
--> statement-breakpoint
CREATE TABLE `LocationCity` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`state_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `LocationState` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
	`country` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `MassMail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`list` varchar(255) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text,
	`quantity` int(11) NOT NULL,
	`created_at` double,
	`status` int(11),
	`user_id` int(11)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`email` varchar(191) NOT NULL,
	`password_hash` varchar(60),
	`auth_key` varchar(255),
	`confirmed_at` int(11),
	`blocked_at` int(11),
	`registration_ip` varchar(45),
	`created_at` double,
	`updated_at` double,
	`flag` int(11),
	`last_login_at` double,
	`origin` varchar(255),
	`num_turma` int(11),
	`name` varchar(255) NOT NULL,
	`bio` text,
	`whatsapp` varchar(255),
	`cpf` varchar(255),
	`postalCode` varchar(255),
	`address` varchar(255),
	`addressNumber` varchar(255),
	`addressDistrict` varchar(255),
	`image` varchar(255),
	`city_id` int(11),
	`state_id` int(11),
	`roles` varchar(60),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `WppCamp` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`description` text,
	`slug` varchar(255),
	`maxclicks` int(11),
	`created_at` double,
	`status` int(11)
);
--> statement-breakpoint
CREATE TABLE `WppGroup` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`url` varchar(255),
	`clicks` int(11),
	`created_at` double,
	`status` int(11),
	`camp_id` int(11)
);
--> statement-breakpoint
CREATE INDEX `Component_componentId_idx` ON `Component` (`componentId`);--> statement-breakpoint
ALTER TABLE `Component` ADD CONSTRAINT `Component_componentId_componentId_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_componentId_componentId_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` ADD CONSTRAINT `ComponentAnnotation_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` ADD CONSTRAINT `ComponentAvailable_componentId_componentId_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_componentId_componentId_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` ADD CONSTRAINT `ComponentCompleted_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ComponentExtra` ADD CONSTRAINT `ComponentExtra_componentId_componentId_fk` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `LocationCity` ADD CONSTRAINT `LocationCity_state_id_LocationState_id_fk` FOREIGN KEY (`state_id`) REFERENCES `LocationState`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `MassMail` ADD CONSTRAINT `MassMail_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `User_city_id_LocationCity_id_fk` FOREIGN KEY (`city_id`) REFERENCES `LocationCity`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `User` ADD CONSTRAINT `User_state_id_LocationState_id_fk` FOREIGN KEY (`state_id`) REFERENCES `LocationState`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `WppGroup` ADD CONSTRAINT `WppGroup_camp_id_WppCamp_id_fk` FOREIGN KEY (`camp_id`) REFERENCES `WppCamp`(`id`) ON DELETE cascade ON UPDATE cascade;
*/