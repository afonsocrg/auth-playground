import dayjs from "dayjs";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { UserSession, user_sessions } from "../db/schema/user_sessions";
import { UnexpectedError } from "./errors";
import { User, users } from "../db/schema/users";
import { generateRandomBytes } from "utils/crypto";

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 8; // 8 hours
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 1 month

function generateAccessToken() {
  return {
    accessToken: generateRandomBytes(32),
    accessExpiration: dayjs().add(ACCESS_TOKEN_MAX_AGE, "seconds").toDate(),
  };
}

function generateRefreshToken() {
  return {
    refreshToken: generateRandomBytes(32),
    refreshExpiration: dayjs().add(REFRESH_TOKEN_MAX_AGE, "seconds").toDate(),
  };
}

const userSessionSchema = {
  id: user_sessions.id,
  userId: user_sessions.userId,
  accessToken: user_sessions.accessToken,
  accessExpiration: user_sessions.accessExpiration,
  refreshToken: user_sessions.refreshToken,
  refreshExpiration: user_sessions.refreshExpiration,
};

export async function createSession(env, userId: number): Promise<UserSession> {
  const { accessToken, accessExpiration } = generateAccessToken();
  const { refreshToken, refreshExpiration } = generateRefreshToken();

  const db = drizzle(env.DB);
  const results = await db
    .insert(user_sessions)
    .values({
      userId,
      accessToken,
      accessExpiration,
      refreshToken,
      refreshExpiration,
    })
    .returning(userSessionSchema);
  const session = results[0];
  return session;
}

export async function getSessionUser(env, accessToken: string): Promise<User> {
  const now = new Date();
  const db = drizzle(env.DB);
  const query = db
    .select({
      id: users.id,
      email: users.email,
      username: users.username,
      expiresAt: user_sessions.accessExpiration
    })
    .from(user_sessions)
    .innerJoin(users, eq(user_sessions.userId, users.id))
    .where(eq(user_sessions.accessToken, accessToken));
  const results = await query;
  // const sql = query.toSQL();
  // console.log("sql:", sql.sql, sql.params);
  // console.log("results:", results);

  if (results.length > 1) {
    // should not happen due to unique constraints
    throw new UnexpectedError(
      `Get user sessions returned ${results.length} rows`
    );
  }
  if (results.length === 0) {
    // No access token
    return null;
  }
  const { expiresAt, ...user } = results[0];
  if (expiresAt < now) {
    return null;
  }
  return user;
}

export async function refreshSession(env, refreshToken: string) {
  const db = drizzle(env.DB);
  const sessions = await db
    .select()
    .from(user_sessions)
    .where(eq(user_sessions.refreshToken, refreshToken));

  console.log(sessions);
  if (sessions.length > 1) {
    // should not happen due to unique constraints
    throw new UnexpectedError(
      `Get user sessions returned ${sessions.length} rows`
    );
  }
  if (sessions.length === 0) {
    // No access token
    return null;
  }
  const session = sessions[0];
  if (session.refreshExpiration < new Date()) {
    // Refresh token expired
    return null;
  }
  const { accessToken: newToken, accessExpiration: newExpiration } =
    generateAccessToken();

  const results = await db
    .update(user_sessions)
    .set({ accessToken: newToken, accessExpiration: newExpiration })
    .where(eq(user_sessions.id, session.id))
    .returning(userSessionSchema);

  if (results.length !== 1) {
    throw new UnexpectedError(
      `Update by id returned ${results.length} results`
    );
  }
  const updatedSession = results[0];
  return updatedSession;
}

export async function deleteSession(env, accessToken: string) {
  const db = drizzle(env.DB);
  await db
    .delete(user_sessions)
    .where(eq(user_sessions.accessToken, accessToken))
    .returning(userSessionSchema);
}
