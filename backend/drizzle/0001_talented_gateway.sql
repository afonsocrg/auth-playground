CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE restrict ON DELETE restrict
);