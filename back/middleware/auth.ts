import { Handler } from 'express';
import {
  ModifiedRequest,
  NonSensativeUser,
  UserRequest,
} from '../services/types';
import { validateNonSensativeUser } from '../services/utils';
import errorCodes from './errorHandler/errorCodes';
import { validateToken } from '../auth_tools/auth_tools';

const createUserRequest = (
  req: ModifiedRequest,
  username: string
): UserRequest => {
  req.username = username;
  return req as UserRequest;
};

const userRequest: Handler = (req: ModifiedRequest, _res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw errorCodes.noAcessToken;
  // Verify access token
  const user: NonSensativeUser = validateNonSensativeUser(
    validateToken(accessToken)
  );
  req = createUserRequest(req, user.username) as UserRequest;
  next();
};
export default userRequest;
