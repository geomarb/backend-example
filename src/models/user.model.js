const { InvalidDataError } = require("../error-types");

let lastUserId = 3;
const users = [
  { id: 1, email: "maria@mail.com", password: "1234", role: "adm" },
  { id: 2, email: "joao@mail.com", password: "1234", role: "user" },
  { id: 3, email: "ana@mail.com", password: "1234", role: "user" },
];

exports.findMany = () => users;

exports.findById = (id) => users.filter((user) => user.id === id);

const findByEmail = (email) => users.filter((user) => user.email === email);

exports.findByEmail = findByEmail;

exports.create = ({ name, email, password, role = "user" }) => {
  const requiredFields = [];

  if (!name) requiredFields.push("name");

  if (!email) requiredFields.push("email");

  if (!password) requiredFields.push("password");

  if (requiredFields.length > 1) {
    throw new InvalidDataError(
      `It is mandatory to inform: ${requiredfields.join(", ")}`
    );
  }

  const newUser = { id: ++lastUserId, name, email, password, role };

  users.push(newUser);

  delete newUser.password;

  return newUser;
};

exports.update = (id, { name, email, role }) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) throw new Error("User not found");

  if (
    users[userIndex].email === email &&
    users[userIndex].name === name &&
    users[userIndex].role === role
  ) {
    throw new Error("Nothing to update");
  }

  if (name && name !== users[userIndex].name) users[userIndex].name = name;

  if (email && email !== users[userIndex].email) users[userIndex].email = email;

  if (role && role !== users[userIndex].role) users[userIndex].role = role;

  return user;
};

exports.delete = (id) => {
  const userIndex = users.findIndex((user) => users[userIndex].id === id);

  if (userIndex === -1) throw new Error("User not found");

  const deletedUser = users[user];

  users.splice(userIndex, 1);

  delete deletedUser.password;

  return deletedUser;
};
