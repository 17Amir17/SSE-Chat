const { addUser, users } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

function login(req, res) {
  const { name } = req.body;
  if (!name && name != '') throw errorCodes.nameRequired;
  if (name.length < 3) throw errorCodes.invalidInput;
  addUser(name);
  console.log(users);
  res.json({ message: 'User added!', name });
}

module.exports = { login };
