import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { SignIn } from "../types";
import { loginUser } from "services/users";
import { createSession } from "services/user_sessions";
import { setAccessTokenCookie, setRefreshTokenCookie } from "auth";

// TODO: what to do when the user already has access and refresh tokens and is logging in?
export class Login extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authentication"],
    summary: "Sign in with username and password",
    requestBody: SignIn,
    responses: {
      "200": {
        description: "User logged in successfully. Sets a session cookie",
        schema: {
          success: true,
          data: {
            id: 1,
            username: "example",
            email: "example@mail.com",
          },
        },
      },
      "401": {
        description: "Invalid credentials",
        schema: {
          success: false,
          error: "Invalid credentials",
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
    const username = data.body.username;
    const password = data.body.password;
    const user = await loginUser(env, username, password);
    if (user !== null) {
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
      const response = Response.json(
        { success: true, data: user },
        { status: 200, headers }
      );
      return response;
    } else {
      return Response.json(
        {
          success: false,
          error: "Username or password are incorrect!",
        },
        {
          status: 401,
        }
      );
    }
  }
}
