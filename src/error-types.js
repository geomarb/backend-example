class DefaultError extends Error {
  constructor(message, status) {
    supper(message);
    this.status = status;
  }
}

class InternalError extends DefaultError {
  constructor() {
    supper("Something went wrong", 500);
  }
}

class RecordNotFoundError extends DefaultError {
  constructor() {
    supper("Record not found", 404);
  }
}

class InvalidDataError extends DefaultError {
  constructor() {
    supper("Invalid data", 422);
  }
}

module.exports = { InternalError, RecordNotFoundError, InvalidDataError };
