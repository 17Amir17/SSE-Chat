const { addUser } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

function login(req, res) {
  const { name } = req.body;
  if (!name && name != '') throw errorCodes.nameRequired;
  if (name.length < 3) throw errorCodes.invalidInput;
  addUser(name);
  res.send('User added!');
}

module.exports = { login };
