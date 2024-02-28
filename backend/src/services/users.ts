import { eq } from "drizzle-orm";
import validator from "validator";
import { drizzle } from "drizzle-orm/d1";
import { users, User } from "../db/schema/users";
import {
  DataError,
  NotFoundError,
  RegistrationError,
  UnexpectedError,
} from "./errors";
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

export function isUsernameValid(username: string): boolean {
  return /^[a-zA-Z0-9_-]{1,32}$/.test(username);
}

export function validateUsername(username) {
  if (!isUsernameValid(username)) {
    throw new DataError(
      "The username should only contain alphanumeric characters, " +
        "hyphens, and underscores, and must be at most 32 characters long."
    );
  }
}

export function isEmailValid(email: string): boolean {
  return validator.isEmail(email);
}

export function validateEmail(email: string) {
  if (!isEmailValid(email)) {
    throw new DataError("The email must have a valid format");
  }
}

export async function registerUser(
  env,
  username: string,
  email: string,
  password: string,
  terms_and_conditions: boolean
): Promise<User> {
  if (!terms_and_conditions) {
    throw new RegistrationError("You must accept the terms and conditions");
  }
  const acceptDate = new Date();
  const passwordHash = hashPassword(password);
  const db = drizzle(env.DB);
  try {
    const results = await db
      .insert(users)
      .values({
        username,
        email,
        passwordHash,
        acceptedTermsAndConditionsAt: acceptDate,
      })
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

export async function getUser(env, id: number): Promise<User> {
  const result = await drizzle(env.DB)
    .select(userSchema)
    .from(users)
    .where(eq(users.id, id));

  if (result.length > 2) {
    throw new UnexpectedError(`Get user returned ${result.length} results`);
  }

  if (result.length === 0) {
    return null;
  }

  return result[0];
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

export async function editUser(
  env,
  id: number,
  { username, email }: { username?: string; email?: string }
): Promise<User> {
  if (!username && !email) {
    // If no data to update, return the current user
    return getUser(env, id);
  }

  // Validate username and email
  if (username !== undefined) {
    validateUsername(username);
  }
  if (email !== undefined) {
    validateEmail(email);
  }

  let result;
  try {
    result = await drizzle(env.DB)
      .update(users)
      .set({ username, email })
      .where(eq(users.id, id))
      .returning(userSchema);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "D1_ERROR: UNIQUE constraint failed: users.username"
      ) {
        throw new DataError("Username already in use!");
      } else if (
        error.message === "D1_ERROR: UNIQUE constraint failed: users.email"
      ) {
        throw new DataError("Email already in use!");
      }
    }
  }
  if (result.length > 1) {
    throw new UnexpectedError(`Update returned ${result.length} rows`);
  }
  if (result.length === 0) {
    throw new NotFoundError(`To-Do #${id} not found`);
  }
  return result[0];
}

export async function deleteUser(env, id: number): Promise<User> {
  const result = await drizzle(env.DB)
    .delete(users)
    .where(eq(users.id, id))
    .returning(userSchema);
  if (result.length === 0) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  if (result.length > 1) {
    throw new UnexpectedError(`Query returned ${result.length} rows`);
  }
  const user = result[0];
  return user;
}
