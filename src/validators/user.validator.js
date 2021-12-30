const Joi = require("joi");
const {
  ValidationError,
  InvalidDataError,
  RecordNotFoundError,
  AlreadyExistsError,
  AuthenticationError,
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

exports.validateIfEmailExists = async (email) => {
  const userFound = await userModel.findByEmail(email);

  if (userFound)
    throw new AlreadyExistsError(`"${email}" is already registered`);
};

exports.validateUserIdAndGetUser = async (id, fields) => {
  if (!id) throw new InvalidDataError("User Id is empty");

  const user = await userModel.findById(id, fields);

  if (!user) throw new RecordNotFoundError(`User id: ${id} not found`);

  return user;
};

exports.validateCreation = async (user) => {
  this.validate(user);

  const { email } = user;

  await this.validateIfEmailExists(email);
};

exports.validateUpdateAndGetUser = async (id, newData) => {
  this.validate(newData, []);

  const { email, name, role, password } = newData;

  if (!(email || name || role || password))
    throw new InvalidDataError("Nothing to be changed");

  const user = await this.validateUserIdAndGetUser(id, ["*"]);

  let hasChanges = false;

  for (field in newData) {
    if (
      newData[field] !== user[field] &&
      user[field] !== undefined &&
      field === "password" &&
      !(await userHelper.verifyPassword(user[field], newData[field]))
    ) {
      hasChanges = true;
    }
  }

  if (!hasChanges) throw new InvalidDataError("Nothing to be changed");

  if (email !== user.email) await this.validateIfEmailExists(email);

  return user;
};

exports.validatePasswordUpdate = async (id, password, newPassword) => {
  if (password === newPassword)
    throw new ValidationError("New passowrd is equal to the old one");

  this.validate({ password }, ["password"]);
  this.validate({ password: newPassword }, ["password"]);

  const user = await this.validateUserIdAndGetUser(id, ["password"]);

  if (!(await userHelper.verifyPassword(user.password, password)))
    throw new AuthenticationError("Wrong password");
};
