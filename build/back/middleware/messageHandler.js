"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../services/utils");
const db_1 = require("../data/db");
const errorCodes_1 = __importDefault(require("./errorHandler/errorCodes"));
const createUserRequest = (req, user) => {
    req.username = user;
    return req;
};
const userRequest = (req, _res, next) => {
    const user = req.query.user;
    console.log('Got request from ', user);
    if (!(0, utils_1.isString)(user))
        throw errorCodes_1.default.invalidInput;
    if (!user)
        throw errorCodes_1.default.mustBeLoggedIn;
    if (!(0, db_1.userExistsByName)(user) && user != 'admin')
        throw errorCodes_1.default.userNotFound;
    req = createUserRequest(req, user);
    next();
};
exports.default = userRequest;
