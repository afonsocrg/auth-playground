CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`access_token` text NOT NULL,
	`access_expiration` integer,
	`refresh_token` text NOT NULL,
	`refresh_expiration` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_access_token_unique` ON `user_sessions` (`access_token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_refresh_token_unique` ON `user_sessions` (`refresh_token`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIdx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `usernameIdx` ON `users` (`username`);