"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const db_1 = require("../data/db");
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
const utils_1 = require("../services/utils");
function register(req, res) {
    // Get and validate params
    const regParams = (0, utils_1.validateRegistrationParams)(req.body);
    // Check if username exists
    if ((0, db_1.userExistsByName)(regParams.username))
        throw errorCodes_1.default.userExists;
    // Create new user
    (0, db_1.addUser)(regParams);
    console.log(db_1.users);
    res.status(200).send();
}
exports.register = register;
