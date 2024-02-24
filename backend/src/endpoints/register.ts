import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { RegisterUser } from "../types";
import { registerUser } from "services/users";
import { createSession } from "services/user_sessions";
import { setAccessTokenCookie, setRefreshTokenCookie } from "auth";
import { RegistrationError } from "services/errors";

export class Register extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authentication"],
    summary: "Register a new user",
    requestBody: RegisterUser,
    responses: {
      "200": {
        description: "User registered successfully",
        schema: {
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
      const session = await createSession(env, user.id);
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        setAccessTokenCookie(session.accessToken, session.accessExpiration)
      );
      headers.append(
        "Set-Cookie",
        setRefreshTokenCookie(session.refreshToken, session.refreshExpiration)
      );
      return Response.json(
        {
          success: true,
          data: user,
        },
        { status: 200, headers }
      );
    } catch (error) {
      if (error instanceof RegistrationError) {
        return Response.json(
          {
            success: false,
            error: error.message,
          },
          {
            status: 400,
          }
        );
      }

      throw error;
    }
  }
}
