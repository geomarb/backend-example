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
    this.detail = { resource, query };
  }
}

class InvalidDataError extends CustomError {
  constructor(resource, data) {
    super("Invalid data", 422);
    this.detail = { resource, data };
  }
}

module.exports = {
  CustomError,
  InternalError,
  RecordNotFoundError,
  InvalidDataError,
};
