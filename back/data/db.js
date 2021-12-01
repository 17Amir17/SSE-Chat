const errorCodes = require('../middleware/errorHandler/errorCodes');

let users = [];
const history = [];

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

const removeUser = (username) => {
  users = users.filter((user) => user.name !== username);
};

const getUsersArr = () => {
  return users;
};

module.exports = {
  addUser,
  removeUser,
  userExistsByName,
  getUsersArr,
  history,
};
