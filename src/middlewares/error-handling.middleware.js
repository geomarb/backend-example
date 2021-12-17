const { CustomError, InternalError } = require("../error-types");

module.exports = (err, _req, res, next) => {
  if (!err) return next();

  console.log(err);

  const error = err instanceof CustomError ? err : new InternalError();

  const { message, status, detail } = error;

  res.status(status).json({ message, ...detail });
};
