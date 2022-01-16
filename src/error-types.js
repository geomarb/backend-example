class HttpError extends Error {
  constructor(status, errorType, message, details) {
    super(message);
    this.status = status;
    this.errorType = errorType;
    this.details = details;
  }
}
class InternalError extends HttpError {
  constructor() {
    super(500, "Internal", "Something went wrong");
  }
}

class RecordNotFoundError extends HttpError {
  constructor(message) {
    super(404, "Record not found", message);
  }
}

class InvalidDataError extends HttpError {
  constructor(message) {
    super(422, "Invalid data", message);
  }
}

class EndpointNotFoundError extends HttpError {
  constructor(endpoint) {
    super(404, "Invalid endpoint", `"${endpoint}" does not exist`);
  }
}

class ValidationError extends HttpError {
  constructor(message, details) {
    super(422, "Validation", message, details);
  }
}

class AuthenticationError extends HttpError {
  constructor(message) {
    super(422, "Authentication", message);
  }
}

class AlreadyExistsError extends HttpError {
  constructor(message) {
    super(409, "Already exists", message);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, "Unauthorized", message);
  }
}

class InvalidCredentialsError extends HttpError {
  constructor() {
    super(401, "Unauthorized", "Invalid credentials");
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(403, "Forbidden", message);
  }
}

module.exports = {
  HttpError,
  InternalError,
  RecordNotFoundError,
  InvalidDataError,
  ValidationError,
  EndpointNotFoundError,
  AlreadyExistsError,
  AuthenticationError,
  UnauthorizedError,
  ForbiddenError,
  InvalidCredentialsError,
};
