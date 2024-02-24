export class ApiError extends Error {}

export class InvalidCredentialsError extends ApiError {}

export class UnhandledError extends ApiError {}
