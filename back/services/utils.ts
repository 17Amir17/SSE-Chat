import errorCodes from '../middleware/errorHandler/errorCodes';
import { LoginParams } from './types';

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
  return isObject(params) && 'name' in params;
}

export function isDate(date: unknown): date is Date {
  const isDate = !!date && isString(date) && isNumber(Date.parse(date));
  return isDate;
}

export function validateLoginParams(params: unknown): LoginParams {
  if (!isLoginParams(params) || !isString(params.name)) {
    throw errorCodes.nameRequired;
  } else if (params.name.length < 3 || params.name.length > 7) {
    throw errorCodes.invalidInput;
  }
  return params;
}
