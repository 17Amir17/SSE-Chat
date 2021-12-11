"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersArr = exports.removeUser = exports.addUser = exports.userExistsByName = exports.chatHistory = void 0;
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
let users = [];
exports.chatHistory = [];
const userExistsByName = (username) => {
    const user = users.find((user) => {
        return user.name === username;
    });
    return !!user;
};
exports.userExistsByName = userExistsByName;
const addUser = (username) => {
    if ((0, exports.userExistsByName)(username))
        throw errorCodes_1.default.userExists;
    users.push({ name: username });
};
exports.addUser = addUser;
const removeUser = (username) => {
    users = users.filter((user) => user.name !== username);
};
exports.removeUser = removeUser;
const getUsersArr = () => {
    return users;
};
exports.getUsersArr = getUsersArr;
