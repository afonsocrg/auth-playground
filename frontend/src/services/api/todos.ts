import axios from "axios";
import type { Todo } from "./types";
import { BASE_URL } from "./consts";

export async function addTodo(name: string): Promise<Todo> {
  const response = await axios.post(
    `${BASE_URL}/api/todos`,
    { name },
    {
      withCredentials: true,
    }
  );
  return response.data.result.todo;
}

export async function getTodos(): Promise<Todo[]> {
  const response = await axios.get(`${BASE_URL}/api/todos`, {
    withCredentials: true,
  });
  return response.data.result.todos;
}

export async function removeTodo(id: number): Promise<void> {
  const response = await axios.delete(`${BASE_URL}/api/todos/${id}`, {
    withCredentials: true,
  });
  return;
}

export async function changeTodo(id: number, newName: string): Promise<Todo> {
  const response = await axios.put(
    `${BASE_URL}/api/todos/${id}`,
    { name: newName },
    { withCredentials: true }
  );
  return response.data.result.todo;
}

export async function completeTodo(id: number): Promise<Todo> {
  const response = await axios.post(`${BASE_URL}/api/todos/${id}/done`, null, {
    withCredentials: true,
  });
  return response.data.result.todo;
}

export async function incompleteTodo(id: number): Promise<Todo> {
  const response = await axios.delete(`${BASE_URL}/api/todos/${id}/done`, {
    withCredentials: true,
  });
  return response.data.result.todo;
}
