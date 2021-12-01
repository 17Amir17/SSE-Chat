const { userExistsByName } = require('../data/db.js');
const errorCodes = require('./errorHandler/errorCodes');

function userRequest(req, res, next) {
  const user = req.query.user;
  console.log('User request from ' + user);
  if (!user) throw errorCodes.mustBeLoggedIn;
  if (!userExistsByName(user)) throw errorCodes.userNotFound;
  req.username = user;
  next();
}

module.exports = userRequest;
