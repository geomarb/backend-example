const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

exports.generateToken = (userId, role) => {
  if (!userId) throw new Error("Invalid userId");

  return jwt.sign({ userId, role }, JWT_PRIVATE_KEY, {
    expiresIn: 1 * 24 * 60 * 60,
  }); // token expires in one day
};

exports.decodeToken = (token) => jwt.verify(token, JWT_PRIVATE_KEY);
