import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    passwordHash: text("password_hash").notNull(),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
    usernameIdx: uniqueIndex("usernameIdx").on(users.username),
  })
);

export type FullUser = typeof users.$inferSelect
export type User = Omit<FullUser, 'passwordHash'>
export type InsertUser = typeof users.$inferInsert