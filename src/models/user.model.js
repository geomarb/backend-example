let lastUserId = 3;
const users = [
  { id: 1, email: "maria@mail.com", password: "1234", role: "adm" },
  { id: 2, email: "joao@mail.com", password: "1234", role: "user" },
  { id: 3, email: "ana@mail.com", password: "1234", role: "user" },
];

exports.findMany = () => users;

const findById = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index < 0) return null;

  return { ...users[index], index };
};

exports.findById = findById;

exports.findByEmail = (email) => users.filter((user) => user.email === email);

exports.create = (user) => {
  const newUser = { id: ++lastUserId, ...user };

  users.push(newUser);

  delete newUser.password;

  return newUser;
};

exports.update = (id, attributes, user) => {
  const { name, email, role } = attributes;

  const { index, ...userFound } = user ? user : findById(id);

  if (name && name !== userFound.name) users[index].name = name;

  if (email && email !== userFound.email) users[index].email = email;

  if (role && role !== userFound.role) users[index].role = role;

  return users[index];
};

exports.delete = (id, user) => {
  // it will not send the password back
  const { index, password, ...deletedUser } = user ? user : findById(id);

  users.splice(index, 1);

  return deletedUser;
};
