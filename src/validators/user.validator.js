const Joi = require("joi");
const {
  ValidationError,
  InvalidDataError,
  RecordNotFoundError,
  AlreadyExistsError,
  AuthenticationError,
  UnauthorizedError,
} = require("../error-types");
const { userHelper } = require("../helpers");
const { userModel } = require("../models");

const getPresence = (fields, field) =>
  fields.includes(field) ? "required" : "optional";

const getSchema = (requiredFields = ["name", "email", "password"]) => {
  return {
    email: Joi.string()
      .email()
      .min(8)
      .max(255)
      .presence(getPresence(requiredFields, "email")),

    name: Joi.string()
      .min(2)
      .max(255)
      .presence(getPresence(requiredFields, "name")),

    role: Joi.string()
      .min(0)
      .max(10)
      .presence(getPresence(requiredFields, "role")),

    password: Joi.string()
      .min(8)
      .max(50)
      .presence(getPresence(requiredFields, "password")),
  };
};

exports.validate = (user, requiredFields) => {
  const schema = getSchema(requiredFields);

  const { error } = Joi.object(schema).validate(user, { abortEarly: false });

  if (error) throw new ValidationError(error.message, error.details);
};

exports.validateIfEmailIsAlreadyRegistered = async (email) => {
  const userFound = await userModel.findByEmail(email);

  if (userFound)
    throw new AlreadyExistsError(`"${email}" is already registered`);
};

exports.validateUserIdAndGetUser = async (userId, fields) => {
  if (!userId) throw new InvalidDataError("User Id is empty");

  const user = await userModel.findById(userId, fields);

  if (!user) throw new RecordNotFoundError(`User id: ${userId} not found`);

  return user;
};

exports.validateCreation = async (newUser) => {
  this.validate(newUser);

  const { email } = newUser;

  await this.validateIfEmailIsAlreadyRegistered(email);
};

exports.validateUpdateAndGetUser = async (currentUser, userId, newData) => {
  this.validate(newData, []);

  const { email, name, role, password } = newData;

  if (!(email || name || role || password))
    throw new InvalidDataError("Nothing to be changed");

  const userFound = await this.validateUserIdAndGetUser(userId, ["*"]);

  let hasChanges = false;

  for (field in newData) {
    if (userFound[field] === undefined)
      throw ValidationError(`Invalid field ${field}`);

    if (
      (field === "password" &&
        !(await userHelper.verifyPassword(userFound[field], newData[field]))) ||
      newData[field] !== userFound[field]
    ) {
      hasChanges = true;
    }
  }

  this.validateChangeRolePermission(currentUser, role, userFound);
  if (!hasChanges) throw new InvalidDataError("Nothing to be changed");

  if (email !== userFound.email)
    await this.validateIfEmailIsAlreadyRegistered(email);

  return userFound;
};

exports.validatePasswordUpdate = async (currentUser, userId, data) => {
  const { password, newPassword } = data;
  const isCurrentUser = userHelper.isCurrentUser(currentUser, userId);

  if (isCurrentUser) {
    if (password === newPassword)
      throw new ValidationError("New password is equal to the old one");
    this.validate({ password }, ["password"]);
  }

  this.validate({ password: newPassword }, ["password"]);

  const userFound = await this.validateUserIdAndGetUser(userId, ["password"]);

  if (
    isCurrentUser &&
    !(await userHelper.verifyPassword(userFound.password, password))
  )
    throw new AuthenticationError("Wrong password");

  if (await userHelper.verifyPassword(userFound.password, newPassword))
    throw new ValidationError("New password is equal to the old one");
};

exports.validatePermission = (currentUser, userId) => {
  if (
    !userHelper.isCurrentUser(currentUser, userId) &&
    !userHelper.isAdm(currentUser)
  )
    throw new UnauthorizedError("Permission denied");
};

exports.validateChangeRolePermission = (currentUser, role, userFound) => {
  if (role && role !== userFound.role && !userHelper.isAdm(currentUser))
    throw new UnauthorizedError("Cannot change 'role'");
};
