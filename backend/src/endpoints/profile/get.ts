import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { User } from "./types";

export default class GetProfile extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Profile"],
    summary: "Get the logged in user's profile",
    description: "Get the logged in user's profile",
    responses: {
      "200": {
        description: "The Logged in user's profile",
        schema: {
          success: true,
          result: {
            user: User,
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
    return { success: true, result: { user: context.user } };
  }
}
