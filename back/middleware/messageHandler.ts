import { Handler } from 'express';
import { ModifiedRequest, UserRequest } from '../services/types';
import { isString } from '../services/utils';

import { userExistsByName } from '../data/db';
import errorCodes from './errorHandler/errorCodes';

const createUserRequest = (req: ModifiedRequest, user: string): UserRequest => {
  req.username = user;
  return req as UserRequest;
};

const userRequest: Handler = (req: ModifiedRequest, _res, next) => {
  const user = req.query.user;
  console.log('Got request from ', user);
  if (!isString(user)) throw errorCodes.invalidInput;
  if (!user) throw errorCodes.mustBeLoggedIn;
  if (!userExistsByName(user) && user != 'admin') throw errorCodes.userNotFound;
  req = createUserRequest(req, user) as UserRequest;
  next();
};
export default userRequest;
