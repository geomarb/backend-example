// TODO implement auth middleware
const { UnauthorizedError } = require("../error-types");
const { authHelper } = require("../helpers");

module.exports = (req, _res, next) => {
  try {
    if (!req.cookies?.token) throw new Error();

    const { userId, role } = authHelper.decodeToken(req.cookies.token);

    req.userId = userId;
    req.role = role;

    console.log({ userId, role });

    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};
