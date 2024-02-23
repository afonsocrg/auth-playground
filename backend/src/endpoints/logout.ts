import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "auth";
import { deleteSession } from "services/user_sessions";
import { createCookie } from "utils/cookies";
import { ACCESS_REFRESH_ENDPOINT } from "auth";

export class Logout extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authentication"],
    summary: "Sign out",
    responses: {
      "200": {
        description: "User logged out successfully. Removes session cookie",
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
    await deleteSession(env, request.cookies?.[ACCESS_TOKEN_KEY]);
    const httpOnly = false;
    const response = Response.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": createCookie(ACCESS_TOKEN_KEY, "", {
            path: "/",
            expires: new Date(),
            sameSite: "Strict",
            httpOnly,
          }),
        },
      }
    );
    response.headers.append(
      "Set-Cookie",
      createCookie(REFRESH_TOKEN_KEY, "", {
        path: ACCESS_REFRESH_ENDPOINT,
        expires: new Date(),
        sameSite: "Strict",
        httpOnly,
      })
    );
    return response;
  }
}
