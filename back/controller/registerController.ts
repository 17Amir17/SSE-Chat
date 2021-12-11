import { Request, Response } from 'express';
import { addUser, userExistsByName, users } from '../data/db';
import errorCodes from '../middleware/errorHandler/errorCodes';
import { RegistrationParams } from '../services/types';
import { validateRegistrationParams } from '../services/utils';

export function register(req: Request, res: Response) {
  // Get and validate params
  const regParams: RegistrationParams = validateRegistrationParams(req.body);
  // Check if username exists
  if (userExistsByName(regParams.username)) throw errorCodes.userExists;
  // Create new user
  addUser(regParams);
  console.log(users);
  res.status(200).send();
}
