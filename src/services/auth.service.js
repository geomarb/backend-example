const { InvalidDataError } = require("../error-types");
const { userModel } = require("../models");

exports.login = ({ email, password }) => {
  if (!email || !password) throw new InvalidDataError("login");
  // TODO implement login service
};

exports.logout = () => {
  // TODO implement logout service
};
