"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_tools_1 = require("../auth_tools/auth_tools");
const db_1 = require("../data/db");
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
const utils_1 = require("../services/utils");
const login = (req, res) => {
    // Validate login params
    const loginParams = (0, utils_1.validateLoginParams)(req.body);
    const user = (0, db_1.getUser)(loginParams.username);
    // Compare passwords
    if (!(0, auth_tools_1.compare)(user.password, loginParams.password))
        throw errorCodes_1.default.incorrectPassword;
    // Check if user is not online
    if ((0, db_1.userOnline)(user.username))
        throw errorCodes_1.default.userIsAlreadyOnline;
    // Add user
    const safeUser = { username: user.username };
    (0, db_1.addOnlineUser)(user);
    // Generate tokens
    const accessToken = (0, auth_tools_1.generateAccessToken)(safeUser);
    const refreshToken = (0, auth_tools_1.generateRefreshToken)(safeUser);
    res.json({ accessToken, refreshToken });
};
exports.login = login;
