const { InvalidDataError, RecordNotFoundError } = require("../error-types");
const { userModel } = require("../models");

function findUserById(id) {
  const foundUser = userModel.findById(parseInt(id));

  if (!foundUser) throw new RecordNotFoundError({ id });

  return foundUser;
}

exports.get = () => userModel.findMany();

exports.getById = (id) => {
  if (!id) throw new InvalidDataError();

  return findUserById(parseInt(id));
};

exports.create = (user) => {
  const requiredFields = ["name", "email", "password"];

  if (!user) throw new InvalidDataError({ user });

  if (!user.name) requiredFields.push("name");

  if (!user.email) requiredFields.push("email");

  if (!user.password) requiredFields.push("password");

  if (requiredFields.length > 1) {
    throw new InvalidDataError({ requiredFields });
  }

  return userModel.create(user);
};

exports.update = (id, attributes) => {
  if (!id) throw new InvalidDataError({ error: "Id is empty" });

  const { email, name, role, password } = attributes;

  if (!(email || name || role || password)) {
    throw new InvalidDataError({ error: "No attributes to be updated" });
  }

  const userFound = findUserById(id);

  if (
    userFound.email === email &&
    userFound.name === name &&
    userFound.role === role &&
    userFound.password === password
  ) {
    throw new InvalidDataError("Nothing to update");
  }

  return userModel.update(id, attributes, userFound);
};

exports.delete = (id) => {
  const userFound = findUserById(id);

  if (!userFound) throw new RecordNotFoundError({ id });

  return userModel.delete(id, userFound);
};

exports.changePassword = (id, newPassword) => {
  if (!id) throw new InvalidDataError({ error: "Id is empty" });
  if (!newPassword)
    throw new InvalidDataError({ error: "New Password is empty" });

  const userFound = findUserById(id);

  if (userFound.password === newPassword) {
    throw new InvalidDataError("Nothing to update");
  }

  return userModel.update(id, { password }, userFound);
};
