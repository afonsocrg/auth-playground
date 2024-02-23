import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "auth";
import { refreshSession } from "services/user_sessions";
import { createCookie } from "utils/cookies";

export class Refresh extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Authentication"],
    summary: "Get a new access token from a refresh token",
    responses: {
      "200": {
        description: "Access token refreshed successfully",
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
    const refreshToken = request.cookies?.[REFRESH_TOKEN_KEY];
    console.log("REFRESHING TOKEN", refreshToken);
    if (!refreshToken) {
      return Response.json(
        {
          success: false,
        },
        { status: 401 }
      );
    }
    const newSession = await refreshSession(env, refreshToken);
    if (!newSession) {
      return Response.json(
        {
          success: false,
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": createCookie(ACCESS_TOKEN_KEY, newSession.accessToken, {
            path: "/",
            expires: newSession.accessExpiration,
            sameSite: "Strict",
            httpOnly: false,
          }),
        },
      }
    );
  }
}
