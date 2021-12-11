"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersArr = exports.getUser = exports.removeOnlineUser = exports.addOnlineUser = exports.userOnline = exports.addUser = exports.userExistsByName = exports.chatHistory = exports.users = void 0;
const auth_tools_1 = require("../auth_tools/auth_tools");
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
exports.users = [];
let onlineUsers = [];
exports.chatHistory = [];
const userExistsByName = (username) => {
    const user = exports.users.find((user) => {
        return user.username === username;
    });
    return !!user;
};
exports.userExistsByName = userExistsByName;
const addUser = (regParams) => {
    if ((0, exports.userExistsByName)(regParams.username))
        throw errorCodes_1.default.userExists;
    exports.users.push({
        username: regParams.username,
        password: (0, auth_tools_1.encrypt)(regParams.password),
    });
};
exports.addUser = addUser;
const userOnline = (username) => {
    const user = onlineUsers.find((user) => {
        return user.username === username;
    });
    return !!user;
};
exports.userOnline = userOnline;
const addOnlineUser = (user) => {
    onlineUsers.push(user);
};
exports.addOnlineUser = addOnlineUser;
const removeOnlineUser = (username) => {
    onlineUsers = onlineUsers.filter((user) => user.username !== username);
};
exports.removeOnlineUser = removeOnlineUser;
const getUser = (username) => {
    const user = exports.users.find((user) => user.username === username);
    if (!user)
        throw errorCodes_1.default.userNotFound;
    return user;
};
exports.getUser = getUser;
const getUsersArr = () => {
    return onlineUsers.map((user) => ({
        name: user.username,
    }));
};
exports.getUsersArr = getUsersArr;
