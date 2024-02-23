import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const user_sessions = sqliteTable("user_sessions", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  accessToken: text("access_token").notNull().unique(),
  accessExpiration: integer("access_expiration", { mode: "timestamp_ms" }),
  refreshToken: text("refresh_token").notNull().unique(),
  refreshExpiration: integer("refresh_expiration", { mode: "timestamp_ms" }),
});

export type UserSession = typeof user_sessions.$inferSelect;
export type InsertUserSession = typeof user_sessions.$inferInsert;
