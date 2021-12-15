const { userModel } = require("../models");

const getUsers = (req, res) => {
  const users = userModel.getUsers();
  res.send(users);
};

module.exports = { getUsers };
