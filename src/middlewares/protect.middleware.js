const { ForbiddenError } = require("../error-types");
const { userHelper } = require("../helpers");

module.exports = (req, _res, next) => {
  if (userHelper.isAdm(req.currentUser)) return next();

  throw new ForbiddenError("Not allowed");
};
