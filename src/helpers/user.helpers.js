const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

exports.generateToken = (userId) => {
  if (!userId) throw new Error("Invalid userId");

  return jwt.sign({ userId }, JWT_PRIVATE_KEY, { expiresIn: 1 * 24 * 60 * 60 }); // token expires in one day
};

exports.decodeToken = (token) =>
  jwt.verify(token, JWT_PRIVATE_KEY, hashingOptions);

exports.hashPassword = async (password) =>
  await argon2.hash(password, hashingOptions);

exports.verifyPassword = async (hashed,candidate) =>
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
