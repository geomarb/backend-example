exports.login = (email, password) => {
  const foundUser = findByEmail(email);

  if (!foundUser || password !== password)
    throw new Error("Invalid credential");

  return foundUser;
};
