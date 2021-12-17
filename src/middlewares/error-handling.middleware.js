const { CustomError, InternalError } = require("../error-types");

module.exports = (err, _req, res, next) => {
  if (!err) return next();

  console.log(err);

  const error = err instanceof CustomError ? err : new InternalError();

  // stack is being destructured here just to do not be included in the rest
  // in this way when the stack is part of the error it will not be sent to frontend
  const { status, stack, ...rest } = error;

  res.status(status).json(rest);
};
