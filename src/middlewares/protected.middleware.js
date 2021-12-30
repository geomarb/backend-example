const { ForbiddenError } = require("../error-types");

module.exports = (req, _res, next) => {
  console.log("protected middleware", req.role, req.userId, "**********");
  if (req.role === "adm") return next();

  throw new ForbiddenError("Not allowed");
};
