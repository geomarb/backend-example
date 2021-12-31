const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

exports.generateToken = ({ id, role }) => {
  if (!id || !role) throw new Error("Invalid user");

  return jwt.sign({ id, role }, JWT_PRIVATE_KEY, { expiresIn: 60 * 60 * 60 });
};

exports.decodeToken = (token) => jwt.verify(token, JWT_PRIVATE_KEY);
