"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginParams = exports.isDate = exports.isLoginParams = exports.isObject = exports.isString = exports.isNumber = void 0;
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
    return isObject(params) && 'name' in params;
}
exports.isLoginParams = isLoginParams;
function isDate(date) {
    const isDate = !!date && isString(date) && isNumber(Date.parse(date));
    return isDate;
}
exports.isDate = isDate;
function validateLoginParams(params) {
    if (!isLoginParams(params) || !isString(params.name)) {
        throw errorCodes_1.default.nameRequired;
    }
    else if (params.name.length < 3 || params.name.length > 7) {
        throw errorCodes_1.default.invalidInput;
    }
    return params;
}
exports.validateLoginParams = validateLoginParams;
