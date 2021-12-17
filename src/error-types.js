class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
class InternalError extends CustomError {
  constructor() {
    super("Something went wrong", 500);
  }
}

class RecordNotFoundError extends CustomError {
  constructor(resource, query) {
    super("Record not found", 404);
    this.resource = resource;
    this.query = query;
  }
}

class InvalidDataError extends CustomError {
  constructor() {
    super("Invalid data", 422);
  }
}

module.exports = {
  CustomError,
  InternalError,
  RecordNotFoundError,
  InvalidDataError,
};
