const { userModel } = require("../models");
const { userValidator } = require("../validators");
const { userHelper } = require("../helpers");

exports.findAll = async (currentUser, userId, fields) => {
  await userValidator.validatePermission(currentUser, userId);
  return await userModel.getAll(fields);
};

exports.findById = async (currentUser, userId, fields) => {
  userValidator.validatePermission(currentUser, userId);

  return await userValidator.validateUserIdAndGetUser(userId, fields);
};
exports.createOne = async (newUser) => {
  await userValidator.validateCreation(newUser);

  const userCreated = await userModel.createOne({
    ...newUser,
    password: await userHelper.hashPassword(newUser.password),
  });

  delete userCreated.password;

  return { ...userCreated, action: "created" };
};

exports.updateOne = async (currentUser, userId, newData) => {
  userValidator.validatePermission(currentUser, userId);

  const userFound = await userValidator.validateUpdateAndGetUser(
    currentUser,
    userId,
    newData
  );

  const [fields, values] = userHelper.getFieldsAndValuesChanged(
    newData,
    userFound
  );

  const passwordIndex = fields.findIndex((field) => field === "password");

  if (passwordIndex > -1) {
    values[passwordIndex] = await userHelper.hashPassword(
      values[passwordIndex]
    );
  }

  await userModel.updateOne(userId, fields, values);

  delete newData.password;
  delete userFound.password;

  return { ...userFound, ...newData, action: "updated", updatedFields: fields };
};

exports.deleteOne = async (currentUser, userId) => {
  userValidator.validatePermission(currentUser, userId);

  const user = await userValidator.validateUserIdAndGetUser(userId);

  await userModel.deleteOne(userId);

  return { ...user, action: "deleted" };
};

exports.updatePassword = async (currentUser, userId, data) => {
  userValidator.validatePermission(currentUser, userId);

  await userValidator.validatePasswordUpdate(currentUser, userId, data);

  const hashedPassword = await userHelper.hashPassword(data.newPassword);

  await userModel.updatePassword(userId, hashedPassword);

  return { id: userId, action: "Password updated" };
};
