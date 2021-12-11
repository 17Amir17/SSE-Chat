"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStopTyping = exports.onUserTyping = exports.onUserSendMessage = exports.onDisconnect = exports.onConnect = void 0;
const db_1 = require("../data/db");
const types_1 = require("../services/types");
const chatController_1 = require("./chatController");
const typingController_1 = require("./typingController");
function onConnect(event) {
    return __awaiter(this, void 0, void 0, function* () {
        //Send hello
        (0, chatController_1.broadcast)({ username: event.username }, types_1.ChatEvent.UserJoined);
    });
}
exports.onConnect = onConnect;
function onDisconnect(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = event.username;
        console.log(`${username} Connection closed`);
        try {
            (0, chatController_1.removeUserAndConnection)(username);
            (0, typingController_1.removeUserFromTyping)(username, userStopTyping);
            console.log((0, db_1.getUsersArr)());
            yield (0, chatController_1.broadcast)({ username }, types_1.ChatEvent.UserLeft);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.onDisconnect = onDisconnect;
function onUserSendMessage(event) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, chatController_1.broadcast)({ username: event.username, message: event.message });
    });
}
exports.onUserSendMessage = onUserSendMessage;
function onUserTyping(event) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, typingController_1.userIsTyping)(event.username, userStopTyping);
        const data = { typing: (0, typingController_1.getTypingList)() };
        (0, chatController_1.broadcast)(data, types_1.ChatEvent.UserTyping);
    });
}
exports.onUserTyping = onUserTyping;
function userStopTyping() {
    const data = { typing: (0, typingController_1.getTypingList)() };
    (0, chatController_1.broadcast)(data, types_1.ChatEvent.UserTyping);
}
exports.userStopTyping = userStopTyping;
