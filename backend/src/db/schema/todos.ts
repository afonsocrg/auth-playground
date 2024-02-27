import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  done: integer("done", { mode: "boolean" }).default(false).notNull(),
  name: text("name").notNull(),
});

export type FullTodo = typeof todos.$inferSelect;
export type Todo = Omit<FullTodo, "userId">;
export type InsertTodo = typeof todos.$inferInsert;
