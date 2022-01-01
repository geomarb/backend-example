const { authService } = require("../services");

const cookiesOptions = { httpOnly: true };

exports.register = async (req, res) => {
  const { token, ...user } = await authService.register(req.body);

  res.cookie("login", token, cookiesOptions).json(user);
};

exports.login = async (req, res) => {
  const { token, ...user } = await authService.login(req.body);

  res.cookie("login", token, cookiesOptions).json(user);
};

exports.logout = async (_req, res) =>
  res.clearCookie("login").json({ message: "logout" });
