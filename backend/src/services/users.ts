import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { users, User } from "../db/schema/users";
import { RegistrationError, UnexpectedError } from "./errors";
import { checkPassword, hashPassword } from "utils/crypto";

const userSchema = {
  id: users.id,
  email: users.email,
  username: users.username,
};

const fullUserSchema = {
  ...userSchema,
  passwordHash: users.passwordHash,
};

export async function registerUser(
  env,
  username: string,
  email: string,
  password: string
): Promise<User> {
  const passwordHash = hashPassword(password);
  const db = drizzle(env.DB);
  try {
    const results = await db
      .insert(users)
      .values({ username, email, passwordHash })
      .returning(userSchema);
    const user = results[0];
    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "D1_ERROR: UNIQUE constraint failed: users.username"
      ) {
        throw new RegistrationError("Username already in use!");
      } else if (
        error.message === "D1_ERROR: UNIQUE constraint failed: users.email"
      ) {
        throw new RegistrationError("Email already in use!");
      }
    }
    throw new UnexpectedError(error.message);
  }
}

export async function loginUser(
  env,
  username: string,
  password: string
): Promise<User | null> {
  const db = drizzle(env.DB);
  const result = await db
    .select(fullUserSchema)
    .from(users)
    .where(eq(users.username, username));

  if (result.length > 2) {
    throw new UnexpectedError(`Get user returned ${result.length} results`);
  }

  if (result.length === 0) {
    return null;
  }

  const { passwordHash, ...user } = result[0];
  if (!checkPassword(password, passwordHash)) {
    return null;
  }

  return user;
}
