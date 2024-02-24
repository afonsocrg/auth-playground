import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { deleteTodo, getUserTodo } from "services/todos";
import { NotFoundError } from "services/errors";

export default class DeleteTodo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "Delete a To-Do by id",
    description:
      "Deletes the given To-Do from the user's To-Do list. If the To-Do does not exist or does not belong to the logged in user, 404 is returned",
    parameters: {
      id: Path(Number, {
        description: "To-Do id",
      }),
    },
    responses: {
      "200": {
        description: "Returns if the Todo was deleted successfully",
        schema: {
          success: true,
          result: {
            todo: Todo,
          },
        },
      },

      "404": {
        description:
          "The To-Do does not exist or does not belong to the logged in user",
        schema: {
          success: false,
          error: "To-Do not found",
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
    const { id } = data.params;
    const user = context.user;
    try {
      await getUserTodo(env, user.id, id);
      const todo = await deleteTodo(env, id);
      return { success: true, result: { todo } };
    } catch (error) {
      if (error instanceof NotFoundError) {
        return {
          success: false,
          error: error.message,
        };
      }
      throw error;
    }
  }
}
