import { drizzle } from "drizzle-orm/d1";

import { Todo, todos } from "db/schema/todos";
import { NotFoundError, UnexpectedError } from "./errors";
import { and, eq } from "drizzle-orm";

const todoSchema = {
  id: todos.id,
  done: todos.done,
  name: todos.name,
};

export async function createTodo(
  env,
  userId: number,
  name: string
): Promise<Todo> {
  const results = await drizzle(env.DB)
    .insert(todos)
    .values({ userId, name })
    .returning(todoSchema);
  console.log(results);
  if (results.length !== 1) {
    throw new UnexpectedError(
      `Result has ${results.length} when creating a To-Do`
    );
  }
  const todo = results[0];
  return todo;
}

export async function searchTodos(env, userId: number): Promise<Todo[]> {
  const results = await drizzle(env.DB)
    .select(todoSchema)
    .from(todos)
    .where(eq(todos.userId, userId));

  console.log(results);
  return results;
}

export async function getTodo(env, id): Promise<Todo> {
  const result = await drizzle(env.DB)
    .select(todoSchema)
    .from(todos)
    .where(eq(todos.id, id));
  if (result.length > 1) {
    throw new UnexpectedError(`Get To-Do returned ${result.length} rows`);
  }
  if (result.length === 0) {
    throw new NotFoundError(`To-Do #${id} not found`);
  }
  const todo = result[0];
  return todo;
}

export async function getUserTodo(
  env,
  userId: number,
  todoId: number
): Promise<Todo> {
  const results = await drizzle(env.DB)
    .select(todoSchema)
    .from(todos)
    .where(and(eq(todos.userId, userId), eq(todos.id, todoId)));

  if (results.length > 1) {
    throw new UnexpectedError(`Get To-Do returned ${results.length} results`);
  }

  if (results.length == 0) {
    throw new NotFoundError(`To-Do #${todoId} not found`);
  }

  const todo = results[0];
  return todo;
}

export async function deleteTodo(env, id: number): Promise<Todo | null> {
  const results = await drizzle(env.DB)
    .delete(todos)
    .where(eq(todos.id, id))
    .returning(todoSchema);
  if (results.length > 1) {
    throw new UnexpectedError(`Delete To-Do returned ${results.length} rows`);
  }

  const todo = results[0] || null;
  return todo;
}

export async function updateTodo(
  env,
  id: number,
  { name, done }: { name?: string; done?: boolean }
): Promise<Todo | null> {
  const result = await drizzle(env.DB)
    .update(todos)
    .set({ name, done })
    .where(eq(todos.id, id))
    .returning(todoSchema);

  if (result.length > 1) {
    throw new UnexpectedError(`Update returned ${result.length} rows`);
  }
  if (result.length === 0) {
    throw new NotFoundError(`To-Do #${id} not found`);
  }
  const todo = result[0];
  return todo;
}
