import errorCodes from '../middleware/errorHandler/errorCodes';
import { LoginParams, NonSensativeUser, RegistrationParams } from './types';

export function isNumber(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj != null;
}

export function isLoginParams(params: unknown): params is LoginParams {
  return isObject(params) && 'username' in params && 'password' in params;
}

export function isRegistrationParams(
  params: unknown
): params is RegistrationParams {
  return isObject(params) && 'username' in params && 'password' in params;
}

export function isDate(date: unknown): date is Date {
  const isDate = !!date && isString(date) && isNumber(Date.parse(date));
  return isDate;
}

export function isNoneSensativeUser(user: unknown): user is NonSensativeUser {
  return isObject(user) && 'username' in user;
}

export function validateLoginParams(params: unknown): LoginParams {
  if (!isLoginParams(params) || !isString(params.username)) {
    throw errorCodes.nameRequired;
  }
  return params;
}

export function validateRegistrationParams(
  params: unknown
): RegistrationParams {
  const saved_names = ['admin', 'Server'];
  if (
    !isRegistrationParams(params) ||
    (!isString(params.username) && !isString(params.password))
  ) {
    throw errorCodes.invalidRegistrationParams;
  } else if (params.username.length < 3 || params.username.length > 7) {
    throw errorCodes.invalidInput;
  } else if (params.password.length < 3) {
    throw errorCodes.passwordTooShort;
  } else if (saved_names.indexOf(params.username) != -1)
    throw errorCodes.userExists;
  return params;
}

export function validateNonSensativeUser(user: unknown) {
  if (!isNoneSensativeUser(user)) throw errorCodes.badToken;
  return user;
}
