class CustomError extends Error {
  constructor(status, errorType, message, details) {
    super(message);
    this.status = status;
    this.errorType = errorType;
    this.details = details;
  }
}
class InternalError extends CustomError {
  constructor() {
    super(500, "Internal", "Something went wrong");
  }
}

class RecordNotFoundError extends CustomError {
  constructor(message) {
    super(404, "Record not found", message);
  }
}

class InvalidDataError extends CustomError {
  constructor(message) {
    super(422, "Invalid data", message);
  }
}

class EndpointNotFoundError extends CustomError {
  constructor(endpoint) {
    super(404, "Endpoint not found", `"${endpoint}" does not exist`);
  }
}

class ValidationError extends CustomError {
  constructor(message, details) {
    super(422, "Validation", message, details);
  }
}

class AuthenticationError extends CustomError {
  constructor(message) {
    super(422, "Authentication", message);
  }
}

class AlreadyExistsError extends CustomError {
  constructor(message) {
    super(409, "Already exists", message);
  }
}

module.exports = {
  CustomError,
  InternalError,
  RecordNotFoundError,
  InvalidDataError,
  ValidationError,
  EndpointNotFoundError,
  AlreadyExistsError,
  AuthenticationError,
};
