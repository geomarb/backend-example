const { userService } = require(".");
const { authHelper } = require("../helpers");
const { authValidator } = require("../validators");

exports.login = async (credentials) => {
  const user = await authValidator.validateCredentialsAndGetUser(credentials);

  const token = authHelper.generateToken(user);

  delete user.password;

  return { ...user, action: "login", token };
};

exports.register = async (user) => {
  const userCreated = await userService.createOne({ ...user, role: "user" });

  const token = authHelper.generateToken(userCreated);

  return { ...userCreated, action: "registered", token };
};
