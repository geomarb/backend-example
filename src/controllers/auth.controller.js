const { authService } = require("../services");

const cookiesOptions = {
  httpOnly: true,
  maxAge: 4 * 60 * 60 * 1000,
  secure: true,
  sameSite: "none",
};

exports.register = async (req, res) => {
  const { token, ...user } = await authService.register(req.body);

  res.cookie("login", token, cookiesOptions).json(user);
};

exports.login = async (req, res) => {
  const { token, ...user } = await authService.login(req.body);

  res.cookie("login", token, cookiesOptions).json(user);
};

exports.logout = async (_req, res) =>
  res.clearCookie("login", cookiesOptions).json({ action: "logout" });
