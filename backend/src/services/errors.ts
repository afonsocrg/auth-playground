class BaseError extends Error {}

export class RegistrationError extends BaseError {
  constructor(message) {
    super(message);
  }
}

export class UnexpectedError extends BaseError {}

export class NotFoundError extends BaseError {}