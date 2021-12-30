const { userValidator } = require(".");
const { userHelper } = require("../helpers");
const { userModel } = require("../models");
const { RecordNotFoundError } = require("../error-types");

exports.validateCredentialsAndGetUser = async (credentials) => {
  userValidator.validate(credentials, ["email", "password"]);

  const { email, password } = credentials;

  const userFound = await userModel.findByEmail(email, ["*"]);

  if (!userFound) throw new RecordNotFoundError(`Invalid credentials`);

  const isValidPassword = await userHelper.verifyPassword(
    userFound.password,
    password
  );

  if (!isValidPassword) throw new RecordNotFoundError(`Invalid credentials`);

  return userFound;
};
