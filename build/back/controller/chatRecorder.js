"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = void 0;
const db_1 = require("../data/db");
const types_1 = require("../services/types");
function record(data, eventType) {
    switch (eventType) {
        case types_1.ChatEvent.UserJoined:
            db_1.chatHistory.push({
                username: 'Server',
                message: `${data.username} joined`,
                time: data.time,
            });
            break;
        case types_1.ChatEvent.UserLeft:
            db_1.chatHistory.push({
                username: 'Server',
                message: `${data.username} left`,
                time: data.time,
            });
            break;
        case types_1.ChatEvent.UserTyping: // Dont record this event
            break;
        default:
            db_1.chatHistory.push(data);
            break;
    }
}
exports.record = record;
