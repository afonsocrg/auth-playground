import { getSessionUser } from "services/user_sessions";
import {
  ACCESS_REFRESH_ENDPOINT,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "./consts";
import { createCookie } from "utils/cookies";

export * from "./consts";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
function getErrorResponse(error) {
  return Response.json(
    {
      success: false,
      error,
    },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": "Bearer",
      },
    }
  );
}

export async function authenticateUser(
  request: Request,
  env: any,
  context: any
) {
  const accessToken = request.cookies?.[ACCESS_TOKEN_KEY];

  if (!accessToken) {
    return getErrorResponse("No access token provided");
  }
  const user = await getSessionUser(env, accessToken);

  if (user === null) {
    return getErrorResponse("The access token is invalid or expired");
  }

  // set the user for endpoint routes to be able to reference it
  context.user = user;
}

function setTokenCookie(
  name: string,
  value: string,
  expiration: Date,
  path: string
): string {
  const httpOnly = false; // TODO: make false only if in dev / .env variable
  return createCookie(name, value, {
    path,
    expires: expiration,
    sameSite: "Lax",
    httpOnly,
  });
}

export function setAccessTokenCookie(
  accessToken: string,
  accessExpiration: Date
) {
  return setTokenCookie(
    ACCESS_TOKEN_KEY,
    accessToken,
    accessExpiration,
    "/"
  );
}

export function setRefreshTokenCookie(
  refreshToken: string,
  refreshExpiration: Date
) {
  return setTokenCookie(
    REFRESH_TOKEN_KEY,
    refreshToken,
    refreshExpiration,
    ACCESS_REFRESH_ENDPOINT
  );
}
