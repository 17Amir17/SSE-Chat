import { RequestHandler } from 'express';
import {
  compare,
  generateAccessToken,
  generateRefreshToken,
} from '../auth_tools/auth_tools';
import { addOnlineUser, getUser, userOnline } from '../data/db';
import errorCodes from '../middleware/errorHandler/errorCodes';
import { LoginParams, NonSensativeUser, User } from '../services/types';
import { validateLoginParams } from '../services/utils';

export const login: RequestHandler = (req, res) => {
  // Validate login params
  const loginParams: LoginParams = validateLoginParams(req.body);
  const user: User = getUser(loginParams.username);
  // Compare passwords
  if (!compare(user.password, loginParams.password))
    throw errorCodes.incorrectPassword;
  // Check if user is not online
  if (userOnline(user.username)) throw errorCodes.userIsAlreadyOnline;
  // Add user
  const safeUser: NonSensativeUser = { username: user.username };
  addOnlineUser(user);
  // Generate tokens
  const accessToken = generateAccessToken(safeUser);
  const refreshToken = generateRefreshToken(safeUser);
  res.json({ accessToken, refreshToken });
};
