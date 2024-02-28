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
    acceptedTermsAndConditionsAt: integer("accepted_terms_and_conditions_at", {
      mode: "timestamp_ms",
    }),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
    usernameIdx: uniqueIndex("usernameIdx").on(users.username),
  })
);

export type FullUser = typeof users.$inferSelect;
export type User = Omit<
  FullUser,
  "passwordHash" | "acceptedTermsAndConditionsAt"
>;
export type InsertUser = typeof users.$inferInsert;
