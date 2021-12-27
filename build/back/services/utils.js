"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNonSensativeUser = exports.validateRegistrationParams = exports.validateLoginParams = exports.isNoneSensativeUser = exports.isDate = exports.isRegistrationParams = exports.isLoginParams = exports.isObject = exports.isString = exports.isNumber = void 0;
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}
exports.isNumber = isNumber;
function isString(str) {
    return typeof str === 'string' || str instanceof String;
}
exports.isString = isString;
function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}
exports.isObject = isObject;
function isLoginParams(params) {
    return isObject(params) && 'username' in params && 'password' in params;
}
exports.isLoginParams = isLoginParams;
function isRegistrationParams(params) {
    return isObject(params) && 'username' in params && 'password' in params;
}
exports.isRegistrationParams = isRegistrationParams;
function isDate(date) {
    const isDate = !!date && isString(date) && isNumber(Date.parse(date));
    return isDate;
}
exports.isDate = isDate;
function isNoneSensativeUser(user) {
    return isObject(user) && 'username' in user;
}
exports.isNoneSensativeUser = isNoneSensativeUser;
function validateLoginParams(params) {
    if (!isLoginParams(params) || !isString(params.username)) {
        throw errorCodes_1.default.nameRequired;
    }
    return params;
}
exports.validateLoginParams = validateLoginParams;
function validateRegistrationParams(params) {
    const saved_names = ['admin', 'Server'];
    if (!isRegistrationParams(params) ||
        (!isString(params.username) && !isString(params.password))) {
        throw errorCodes_1.default.invalidRegistrationParams;
    }
    else if (params.username.length < 3 || params.username.length > 7) {
        throw errorCodes_1.default.invalidInput;
    }
    else if (params.password.length < 3) {
        throw errorCodes_1.default.passwordTooShort;
    }
    else if (saved_names.indexOf(params.username) != -1)
        throw errorCodes_1.default.userExists;
    return params;
}
exports.validateRegistrationParams = validateRegistrationParams;
function validateNonSensativeUser(user) {
    if (!isNoneSensativeUser(user))
        throw errorCodes_1.default.badToken;
    return user;
}
exports.validateNonSensativeUser = validateNonSensativeUser;
