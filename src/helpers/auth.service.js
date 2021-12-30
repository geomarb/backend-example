const { userService } = require(".");
const { authHelper } = require("../helpers");
const { authValidator } = require("../validators");

exports.login = async (credentials) => {
  const userFound = await authValidator.validateCredentialsAndGetUser(
    credentials
  );

  const token = authHelper.userHelper(userFound.id, userFound.role);

  delete userFound.password;

  return { ...userFound, action: "login", token };
};

exports.register = async (user) => {
  const userCreated = await userService.create(user);

  const token = authHelper.userHelper(userFound.id, userFound.role);

  return { ...userCreated, action: "registered", token };
};
