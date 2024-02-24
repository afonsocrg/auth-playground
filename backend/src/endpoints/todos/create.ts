import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { createTodo } from "services/todos";

export default class CreateTodo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "Create a new To Do",
    description: "Creates a new To-Do item associated with the logged in user.",
    requestBody: { name: "Document the API" },
    responses: {
      "200": {
        description: "Returns the created To-Do item",
        schema: {
          success: true,
          result: {
            todo: Todo,
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>
  ) {
    // Retrieve the validated request body
    const { name } = data.body;
    const user = context.user;

    const todo = await createTodo(env, user.id, name);

    return {
      success: true,
      result: {
        todo,
      },
    };
  }
}
