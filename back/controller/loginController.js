const { addUser } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

function login(req, res) {
  const { name } = req.body.name;
  if (!name) throw errorCodes.nameRequired;
  if (name.length < 5) throw errorCodes.invalidInput;
  console.log(`Login request from ${req.body.name}`);
  addUser(name);
  res.send('User added!');
}

module.exports = { login };
