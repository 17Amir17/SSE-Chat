const { addUser } = require('../data/db');
import { RequestHandler } from 'express';
import errorCodes from '../middleware/errorHandler/errorCodes';
import { LoginParams } from '../services/types';
import { validateLoginParams } from '../services/utils';

const saved_names = ['admin', 'Server'];

const login: RequestHandler = (req, res) => {
  const loginParams: LoginParams = validateLoginParams(req.body);
  if (saved_names.indexOf(loginParams.name) != -1) throw errorCodes.userExists;
  addUser(loginParams.name);
  res.json({ message: 'User added!', name: loginParams.name });
};

module.exports = { login };
