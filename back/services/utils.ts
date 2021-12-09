export function isNumber(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}
