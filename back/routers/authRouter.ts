import express from 'express';
import { register } from '../controller/registerController';
import { login } from '../controller/loginController';
import errorCodes from '../middleware/errorHandler/errorCodes';
import {
  generateAccessToken,
  isRefreshTokenValid,
  validateToken,
} from '../auth_tools/auth_tools';
import { validateNonSensativeUser } from '../services/utils';
import { NonSensativeUser } from '../services/types';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw errorCodes.noRefreshToken;
  if (!isRefreshTokenValid(refreshToken)) throw errorCodes.badToken;
  const user: NonSensativeUser = {
    username: validateNonSensativeUser(validateToken(refreshToken)).username,
  };
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

export default router;
