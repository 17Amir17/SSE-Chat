const { userExistsByName } = require('../data/db.js');
const errorCodes = require('./errorHandler/errorCodes');

function userRequest(req, res, next) {
  const user = req.query.user;
  if (!user) throw errorCodes.mustBeLoggedIn;
  if (!userExistsByName(user) && user != 'admin') throw errorCodes.userNotFound;
  req.username = user;
  next();
}

module.exports = userRequest;
