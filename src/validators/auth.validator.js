const { userValidator } = require(".");
const { userHelper } = require("../helpers");
const { userModel } = require("../models");
const { InvalidCredentialsError } = require("../error-types");

exports.validateCredentialsAndGetUser = async (credentials) => {
  userValidator.validate(credentials, ["email", "password"]);

  const userFound = await userModel.findByEmail(credentials.email, ["*"]);

  if (!userFound) throw new InvalidCredentialsError();

  const isValidPassword = await userHelper.verifyPassword(
    userFound.password,
    credentials.password
  );

  if (!isValidPassword) throw new InvalidCredentialsError();

  return userFound;
};
