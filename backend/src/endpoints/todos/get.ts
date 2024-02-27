import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { getUserTodo } from "services/todos";
import { NotFoundError } from "services/errors";

export default class GetTodo extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "Get a To-Do by id",
    description:
      "Gets a To-Do item by id. If the To-Do does not exist or does not belong to the logged in user, 404 is returned",
    parameters: {
      id: Path(Number, {
        description: "To-Do id",
      }),
    },
    responses: {
      "200": {
        description: "The To-Do with the given id",
        schema: {
          success: true,
          result: {
            todo: Todo,
          },
        },
      },
      "404": {
        description: "To-Do not found",
        schema: {
          success: false,
          error: String,
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
      const todo = await getUserTodo(env, user.id, id);
      return { success: true, result: { todo } };
    } catch (error) {
      if (error instanceof NotFoundError) {
        return Response.json(
          { success: false, error: error.message },
          { status: 404 }
        );
      }
      throw error;
    }
  }
}
