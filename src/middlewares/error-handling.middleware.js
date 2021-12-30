const { HttpError, InternalError } = require("../error-types");

module.exports = (err, _req, res, next) => {
  if (!err) return next();

  console.log(err);

  const error = err instanceof HttpError ? err : new InternalError();

  const { status, message: errorMessage, errorType, details } = error;

  res.status(status).json({ errorMessage, errorType, details });
};
