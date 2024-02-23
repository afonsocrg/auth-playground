import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { users, User } from "../db/schema/users";
import { UnexpectedError } from "./errors";
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
  console.log(
    `Registering user ${username} with email ${email} and password ${password}`
  );

  const passwordHash = hashPassword(password);
  const db = drizzle(env.DB);
  const results = await db
    .insert(users)
    .values({ username, email, passwordHash })
    .returning(userSchema);
  const user = results[0];
  return user;
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
    throw new UnexpectedError(
      `Get user returned ${result.length} results`
    );
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
