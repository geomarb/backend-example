const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

exports.generateToken = ({ id, role }) => {
  if (!id || !role) throw new Error("Invalid token payload");

  return jwt.sign({ id, role }, JWT_PRIVATE_KEY, { expiresIn: "4h" });
};

exports.decodeToken = (token) => jwt.verify(token, JWT_PRIVATE_KEY);
