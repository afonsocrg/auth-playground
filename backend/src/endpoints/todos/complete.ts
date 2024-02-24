import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { getUserTodo, updateTodo } from "services/todos";
import { NotFoundError } from "services/errors";

export default class CompleteTodo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "Mark a To-Do as done",
    description: "Marks a To-Do in the logged in user's list as done",
    parameters: {
      id: Path(Number, {
        description: "To-Do id",
      }),
    },
    responses: {
      "200": {
        description: "Returns the updated To-Do item",
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
    const { id } = data.params;
    const user = context.user;

    try {
      await getUserTodo(env, user.id, id);
      const todo = await updateTodo(env, id, { done: true });

      return { success: true, result: { todo } };
    } catch (error) {
      if (error instanceof NotFoundError) {
        return Response.json(
          { success: false, error: error.message },
          { status: 404 }
        );
      }
    }
  }
}
