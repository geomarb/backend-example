const { InvalidDataError } = require("../error-types");
const { userModel } = require("../models");
const { userValidator } = require("../validators");
const { userHelpers } = require("../helpers");

exports.getAll = async (fields) => await userModel.getAll(fields);

exports.findById = async (id, fields) =>
  await userValidator.validateUserIdAndGetUser(parseInt(id), fields);

exports.create = async (user) => {
  await userValidator.validateCreation(user);

  const userCreated = await userModel.create({
    ...user,
    password: await userHelpers.hashPassword(user.password),
  });
  delete userCreated.password;
  return { ...userCreated, action: "created" };
};

exports.update = async (id, newData) => {
  const user = await userValidator.validateUpdateAndGetUser(id, newData);

  const [fields, values] = userHelpers.getFieldsAndValuesChanged(newData, user);

  const passwordIndex = fields.findIndex((field) => field === "password");

  if (passwordIndex > -1) {
    values[passwordIndex] = await userHelpers.hashPassword(
      values[passwordIndex]
    );
  }

  await userModel.update(id, fields, values);

  delete newData.password;
  delete user.password;

  return { ...user, ...newData, action: "updated", updatedFields: fields };
};

exports.delete = async (id) => {
  const user = await userValidator.validateUserIdAndGetUser(id);

  await userModel.delete(id);

  return { ...user, action: "deleted" };
};

exports.updatePassword = async (id, { password, newPassword }) => {
  await userValidator.validatePasswordUpdate(id, password, newPassword);

  const hashedPassword = await userHelpers.hashPassword(newPassword);

  await userModel.updatePassword(id, hashedPassword);

  return { id, action: "Password updated" };
};
