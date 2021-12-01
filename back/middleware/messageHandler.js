const errorCodes = require('./errorHandler/errorCodes');

function userRequest(req, res, next) {
  const user = req.query.user;
  if (!user) throw errorCodes.mustBeLoggedIn;
  req.name = user;
  next();
}

module.exports = userRequest;
