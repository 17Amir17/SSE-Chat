import { RequestHandler } from 'express';
import {
  compare,
  generateAccessToken,
  generateRefreshToken,
} from '../auth_tools/auth_tools';
import { getUser } from '../data/db';
import errorCodes from '../middleware/errorHandler/errorCodes';
import { LoginParams, NonSensativeUsers, User } from '../services/types';
import { validateLoginParams } from '../services/utils';

export const login: RequestHandler = (req, res) => {
  // Validate login params
  const loginParams: LoginParams = validateLoginParams(req.body);
  const user: User = getUser(loginParams.username);
  // Compare passwords
  if (!compare(user.password, loginParams.password))
    throw errorCodes.incorrectPassword;
  // Generate tokens
  const safeUser: NonSensativeUsers = { username: user.username };
  const accessToken = generateAccessToken(safeUser);
  const refreshToken = generateRefreshToken(safeUser);
  res.json({ accessToken, refreshToken });
};
