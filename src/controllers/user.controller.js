const { userModel } = require("../models");

exports.getMany = (_req, res) => {
  try {
    const users = userModel.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.getOne = (req, res) => {
  try {
    const user = userModel.findById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.update = (req, res) => {
  try {
    const users = userModel.update(req.params.id, req.body);
    res.send(users);
  } catch (error) {
    next(error);
  }
};
