const { userService } = require("../services");

exports.get = (_req, res, next) => {
  try {
    const users = userService.get();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.getOne = (req, res, next) => {
  try {
    const user = userService.getById(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  try {
    const newUser = userService.create(req.body);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const updatedUser = userService.update(req.params.id, req.body);
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.delete = (req, res, next) => {
  try {
    const users = userService.delete(req.params.id, req.body);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.changePassword = (req, res, next) => {
  try {
    const updatedUser = userService.changePassword(
      req.params.id,
      req.body.password
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};
