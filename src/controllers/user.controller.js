const { UserModel } = require("../models");

const getUsers = (req, res) => {
  const users = UserModel.getUsers();
  res.send(users);
};

module.exports = { getUsers };
