"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const { addUser } = require('../data/db');
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
const utils_1 = require("../services/utils");
const saved_names = ['admin', 'Server'];
const login = (req, res) => {
    const loginParams = (0, utils_1.validateLoginParams)(req.body);
    if (saved_names.indexOf(loginParams.name) != -1)
        throw errorCodes_1.default.userExists;
    addUser(loginParams.name);
    res.json({ message: 'User added!', name: loginParams.name });
};
exports.login = login;
