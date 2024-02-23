import { getSessionUser } from "services/user_sessions";
import { ACCESS_TOKEN_KEY } from "./consts";

export * from "./consts";

export function validateToken(token: string) {
  return true;
}

// export function getBearer(request: Request): null | string {
//   const authHeader = request.headers.get("Authorization");
//   if (!authHeader || authHeader.substring(0, 6) !== "Bearer") {
//     return null;
//   }
//   return authHeader.substring(6).trim();
// }

export async function authenticateUser(
  request: Request,
  env: any,
  context: any
) {
  const accessToken = request.cookies?.[ACCESS_TOKEN_KEY];
  if (!accessToken) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate
    return Response.json(
      {
        success: false,
        error: "No access token provided",
      },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": "Bearer",
        },
      }
    );
  }
  const user = await getSessionUser(env, accessToken);

  if (user === null) {
    return Response.json(
      {
        success: false,
        error: "The access token is invalid or expired",
      },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": "Bearer",
        },
      }
    );
  }

  // set the user for endpoint routes to be able to reference it
  context.user = user;
}
