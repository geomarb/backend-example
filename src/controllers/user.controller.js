const userModel = require("../models/user.model");

const getUsers = (req, res) => {
  const users = userModel.getUsers();
  res.send(users);
};

module.exports = { getUsers };
