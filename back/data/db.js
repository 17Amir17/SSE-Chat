const errorCodes = require('../middleware/errorHandler/errorCodes');

const users = [];

const userExistsByName = (username) => {
  const user = users.find((user) => {
    return user.name === username;
  });
  return !!user;
};

const addUser = (username) => {
  if (userExistsByName(username)) throw errorCodes.userExists;
  users.push({ name: username });
};

module.exports = { addUser };
