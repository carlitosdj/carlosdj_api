ALTER TABLE `Component` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `Component` MODIFY COLUMN `status` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `Component` MODIFY COLUMN `duration` int;--> statement-breakpoint
ALTER TABLE `Component` MODIFY COLUMN `componentId` int;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `status` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAnnotation` MODIFY COLUMN `componentId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentAvailable` MODIFY COLUMN `componentId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `rate` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `status` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentCompleted` MODIFY COLUMN `componentId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentExtra` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ComponentExtra` MODIFY COLUMN `status` int;--> statement-breakpoint
ALTER TABLE `ComponentExtra` MODIFY COLUMN `componentId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Lead` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `Lead` MODIFY COLUMN `confirm` int;--> statement-breakpoint
ALTER TABLE `Lead` MODIFY COLUMN `naoperturbe` int;--> statement-breakpoint
ALTER TABLE `LocationCity` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `LocationCity` MODIFY COLUMN `state_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `LocationState` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `LocationState` MODIFY COLUMN `country` int NOT NULL;--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `quantity` int NOT NULL;--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `status` int;--> statement-breakpoint
ALTER TABLE `MassMail` MODIFY COLUMN `user_id` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `confirmed_at` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `blocked_at` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `flag` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `num_turma` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `city_id` int;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `state_id` int;--> statement-breakpoint
ALTER TABLE `WppCamp` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `WppCamp` MODIFY COLUMN `maxclicks` int;--> statement-breakpoint
ALTER TABLE `WppCamp` MODIFY COLUMN `status` int;--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `clicks` int;--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `status` int;--> statement-breakpoint
ALTER TABLE `WppGroup` MODIFY COLUMN `camp_id` int;