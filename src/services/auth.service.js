const { userService } = require(".");
const { authHelper } = require("../helpers");
const { authValidator } = require("../validators");

exports.login = async (credentials) => {
  const userFound = await authValidator.validateCredentialsAndGetUser(
    credentials
  );

  const token = authHelper.generateToken(userFound.id, userFound.role);

  delete userFound.password;

  return { ...userFound, action: "login", token };
};

exports.register = async (user) => {
  const userCreated = await userService.create(user);

  const token = authHelper.generateToken(userCreated.id, userCreated.role);

  return { ...userCreated, action: "registered", token };
};
