import { Handler } from 'express';
import { ModifiedRequest } from '../services/types';
import { isString } from '../services/utils';

const { userExistsByName } = require('../data/db.js');
const errorCodes = require('./errorHandler/errorCodes');

const userRequest: Handler = (req: ModifiedRequest, _res, next) => {
  const user = req.query.user;
  if (!isString(user)) throw errorCodes.invalidInput;
  if (!user) throw errorCodes.mustBeLoggedIn;
  if (!userExistsByName(user) && user != 'admin') throw errorCodes.userNotFound;
  req.username = user;
  next();
};
export default userRequest;
