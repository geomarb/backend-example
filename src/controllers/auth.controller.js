const { authService } = require("../services");
const { userValidator } = require("../validators");

exports.login = (req, res, next) => {
  try {
    userValidator.validateLogin(req.body);
    const { token, password, ...user } = authService.login(req.body);

    res.status(200).cookie("login", token, { httpOnly: true }).json(user);
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    const auth = authService.logout();
    res.status(400).json({ message: "fakeLogout" });
  } catch (err) {
    next(err);
  }
};
