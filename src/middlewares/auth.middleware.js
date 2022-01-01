// TODO implement auth middleware
const { UnauthorizedError, ForbiddenError } = require("../error-types");
const { authHelper } = require("../helpers");

module.exports = (req, _res, next) => {
  if (!req.cookies?.login) return next(new ForbiddenError("Invalid token"));

  try {
    req.currentUser = authHelper.decodeToken(req.cookies.login);

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};
