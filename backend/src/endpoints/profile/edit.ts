import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Str,
} from "@cloudflare/itty-router-openapi";
import { editUser } from "services/users";
import { User } from "./types";
import { DataError } from "services/errors";

export default class EditProfile extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Profile"],
    summary: "Edit profile",
    description: "Edit the logged in user's profile",
    requestBody: {
      username: new Str({ example: "newUsername", required: false }),
      email: new Str({ example: "newemail@email.com", required: false }),
    },
    responses: {
      "200": {
        description: "The user profile was updated successfully",
        schema: {
          success: true,
          result: {
            user: User,
          },
        },
      },
      "400": {
        description: "The given username or email had an invalid format",
        schema: {
          success: false,
          error: "The error message",
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
    const { username, email } = data.body;
    const user = context.user;
    const id = user.id;
    try {
      const user = await editUser(env, id, { username, email });
      return Response.json({
        success: true,
        result: { user },
      });
    } catch (error) {
      if (error instanceof DataError) {
        return Response.json(
          {
            sucess: false,
            error: error.message,
          },
          { status: 400 }
        );
      }
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
}
