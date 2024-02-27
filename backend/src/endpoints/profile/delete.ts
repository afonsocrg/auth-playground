import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { deleteUser } from "services/users";

export default class DeleteProfile extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Profile"],
    summary: "Delete profile",
    description: "Delete the logged in user's profile",
    responses: {
      "201": {
        description: "The user and all its tasks were deleted successfully",
        schema: {
          success: true,
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
    try {
      await deleteUser(env, context.user.id);
      return {
        success: true,
      };
    } catch (error) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
