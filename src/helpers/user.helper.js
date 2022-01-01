const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

exports.hashPassword = async (password) =>
  await argon2.hash(password, hashingOptions);

exports.verifyPassword = async (hashed, candidate) =>
  await argon2.verify(hashed, candidate);

exports.getFieldsAndValuesChanged = (newData, data) => {
  // 0: fields changed,  1: new values
  let result = [[], []];

  // run all fields of newData and add: fields changed, new value, and fields not changed
  for (const field in newData) {
    if (
      newData[field] !== undefined &&
      data[field] !== undefined &&
      newData[field] !== data[field]
    ) {
      result = [
        [...result[0], field],
        [...result[1], newData[field]],
      ];
    }
  }

  return result;
};

exports.isAdm = ({ role }) => role === "adm";

exports.isCurrentUser = ({ id }, userId) => id === userId;
