const { InvalidDataError } = require("../error-types");
const { userModel } = require("../models");

exports.login = async ({ email, password }) => {
  const userFound = await userModel.findByEmail(email);

  if (password === userFound.password) return { message: "logged" };

  return { message: "cannot login" };
}; // TODO implement login service

exports.logout = () => {
  // TODO implement logout service
};
