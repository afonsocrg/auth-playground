import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { RegisterUser } from "../types";
import { registerUser } from "services/users";

export class Register extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authentication"],
    summary: "Register a new user",
    requestBody: RegisterUser,
    responses: {
      "200": {
        description: "User registered successfully",
        schema: {
          // TODO: return user
          success: true,
          data: {
            id: 1,
            username: "example",
            email: "example@email.com",
          },
        },
      },
      "400": {
        description: "Could not register user",
        schema: {
          success: false,
          error: "Error description",
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
    const { username, email, password } = data.body;
    try {
      const user = await registerUser(env, username, email, password);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      // Something went wrong
      // TODO: improve handling
      return Response.json(
        {
          success: false,
          error: "Username or email already in use",
        },
        {
          status: 400,
        }
      );
    }
  }
}
