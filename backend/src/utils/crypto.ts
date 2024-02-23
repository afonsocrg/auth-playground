import * as crypto from "node:crypto";

export function generateRandomBytes(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

function __hashPassword(password: string, salt: string): string {
  const nIterations = 100000;
  const keylen = 128;
  // return crypto.scryptSync(password, salt, keylen).toString('hex');
  return crypto
    .pbkdf2Sync(password, salt, nIterations, keylen, "sha512")
    .toString("hex");
}

export function hashPassword(password: string): string {
  const salt = generateRandomBytes(32);
  const hash = __hashPassword(password, salt);
  return `${salt}:${hash}`;
}

export function checkPassword(password: string, passwordHash: string) {
  const [salt, hash] = passwordHash.split(":");
  return hash === __hashPassword(password, salt);
}
