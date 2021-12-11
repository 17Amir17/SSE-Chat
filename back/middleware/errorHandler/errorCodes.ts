import { ErrorCodes } from '../../services/types';

const errorCodes: ErrorCodes = {
  invalidInput: {
    message: 'Invalid input - must be atleast 3 characters and less than 7',
    code: 400,
  },
  invalidRegistrationParams: {
    message: 'Either username or password params are invalid',
    code: 400,
  },
  passwordTooShort: {
    message: 'Password must be atleast 3 characters long',
    code: 400,
  },
  userExists: { message: 'User Already Exists', code: 409 },
  nameRequired: { message: 'Login name required', code: 400 },
  mustBeLoggedIn: { message: 'Must be logged in', code: 403 },
  emptyMessage: { message: 'Recieved empty message', code: 400 },
  userNotFound: { message: 'User not found', code: 404 },
  incorrectPassword: { message: 'Incorrect Password', code: 403 },
};

export default errorCodes;
