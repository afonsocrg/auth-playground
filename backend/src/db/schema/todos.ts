import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  done: integer("done", { mode: "boolean" }).default(false).notNull(),
  name: text("name").notNull(),
});

export type Todo = typeof todos.$inferSelect;
export type InsertTodo = typeof todos.$inferInsert;
