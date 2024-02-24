import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { getUserTodo, updateTodo } from "services/todos";
import { NotFoundError } from "services/errors";

export default class EditTodo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "Edit a To Do by id",
    description: "Edits an existing To-Do in the logged in user's list",
    parameters: {
      id: Path(Number, {
        description: "To-Do id",
      }),
    },
    requestBody: { name: "The new name" },
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
    const { name } = data.body;
    const { id } = data.params;
    const user = context.user;

    try {
      await getUserTodo(env, user.id, id);
      const todo = await updateTodo(env, id, { name });

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
