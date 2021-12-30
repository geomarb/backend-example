const { authService } = require("../services");

exports.login = async (req, res) => {
  const { token, ...user } = await authService.login(req.body);

  res.cookie("token", token, { httpOnly: true }).json(user);
};

exports.logout = async (req, res) =>
  res.clearCookie("token").json({ message: "logout" });

exports.register = async (req, res) => {
  const { token, ...registeredUser } = await authService.register(req.body);
  console.log({ token, registeredUser });
  res.cookie("token", token, { httpOnly: true }).json(registeredUser);
};
