const { authService } = require("../services");

exports.login = (req, res, next) => {
  try {
    const auth = authService.login();
    res.status(400).jsont({ token: "fakeToken" });
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
