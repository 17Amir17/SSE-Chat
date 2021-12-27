"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../services/utils");
const errorCodes_1 = __importDefault(require("./errorHandler/errorCodes"));
const auth_tools_1 = require("../auth_tools/auth_tools");
const createUserRequest = (req, username) => {
    req.username = username;
    return req;
};
const userRequest = (req, _res, next) => {
    const accessToken = req.headers.authorization;
    console.log(accessToken);
    if (!accessToken)
        throw errorCodes_1.default.noAcessToken;
    // Verify access token
    const user = (0, utils_1.validateNonSensativeUser)((0, auth_tools_1.validateToken)(accessToken));
    req = createUserRequest(req, user.username);
    next();
};
exports.default = userRequest;
