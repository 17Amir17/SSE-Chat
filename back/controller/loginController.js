const { addUser, users } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

const saved_names = ['admin', 'Server'];

function login(req, res) {
  const { name } = req.body;
  if (!name && name != '') throw errorCodes.nameRequired;
  if (name.length < 3 || name.length > 7) throw errorCodes.invalidInput;
  if (saved_names.indexOf(name) != -1) throw errorCodes.userExists;
  addUser(name);
  console.log(users);
  res.json({ message: 'User added!', name });
}

module.exports = { login };
