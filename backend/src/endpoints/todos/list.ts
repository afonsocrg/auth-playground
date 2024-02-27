import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import { Todo } from "./types";
import { searchTodos } from "services/todos";

export default class ListTodos extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["To-Do"],
    summary: "List To-Dos",
    description: "List the logged in user's To-Do items",
    // parameters: {
    //   page: Query(Number, {
    //     description: "Page number",
    //     default: 0,
    //   }),
    //   perPage: Query(Number, {
    //     description: "Number of items per page",
    //     default: 10,
    //   }),
    //   isCompleted: Query(Boolean, {
    //     description: "Filter by completed flag",
    //     required: false,
    //   }),
    // },
    responses: {
      "200": {
        description: "Returns the user's To-Do list",
        schema: {
          success: Boolean,
          result: {
            todos: [Todo],
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
    const user = context.user;
    const todos = await searchTodos(env, user.id);
    return { success: true, result: { todos } };
    // return { success: true, result: { todos } };
  }
}
