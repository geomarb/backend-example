// let's start with fake data
const users = [
  { id: 1, email: "maria@mail.com", password: "1234" },
  { id: 2, email: "joao@mail.com", password: "1234" },
  { id: 3, email: "ana@mail.com", password: "1234" },
];

// return all users
const getUsers = () => users;

module.exports = { getUsers };
