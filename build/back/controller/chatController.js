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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserAndConnection = exports.broadcast = exports.userTyping = exports.getHistory = exports.getUsers = exports.stream = exports.onSend = exports.connections = void 0;
const types_1 = require("../services/types");
const db_1 = require("../data/db");
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
const TypedEvent_1 = __importDefault(require("../services/TypedEvent"));
const messageController_1 = require("./messageController");
const chatRecorder_1 = require("./chatRecorder");
exports.connections = {};
//Create Events
const onDisconnectEvent = new TypedEvent_1.default();
const onConnectEvent = new TypedEvent_1.default();
const onSendEvent = new TypedEvent_1.default();
const onUserTypingEvent = new TypedEvent_1.default();
//Sub to events
onDisconnectEvent.on(messageController_1.onDisconnect);
onConnectEvent.on(messageController_1.onConnect);
onSendEvent.on(messageController_1.onUserSendMessage);
onUserTypingEvent.on(messageController_1.onUserTyping);
function onSend(req, res) {
    const { message } = req.body;
    if (!message)
        throw errorCodes_1.default.emptyMessage;
    onSendEvent.emit({ username: req.username, message });
    res.status(200).send('sent');
}
exports.onSend = onSend;
function stream(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Streaming for ${req.username}`);
        res.setHeader('Content-Type', 'text/event-stream');
        try {
            //Add user to connections
            exports.connections[req.username] = { name: req.username, stream: res };
            onConnectEvent.emit({ username: req.username });
            //When Connection close remove connection
            req.on('close', () => {
                onDisconnectEvent.emit({ username: req.username });
            });
        }
        catch (error) {
            console.log(error);
            onDisconnectEvent.emit({ username: req.username });
        }
    });
}
exports.stream = stream;
function getUsers(_req, res) {
    res.json((0, db_1.getUsersArr)());
}
exports.getUsers = getUsers;
function getHistory(_req, res) {
    res.json(db_1.chatHistory);
}
exports.getHistory = getHistory;
function userTyping(req, res) {
    onUserTypingEvent.emit({ username: req.username });
    res.json();
}
exports.userTyping = userTyping;
function broadcast(data, eventType = types_1.ChatEvent.ChatMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        data.time = new Date(); // Give time to date
        (0, chatRecorder_1.record)(data, eventType);
        for (const connection in exports.connections) {
            try {
                const stream = exports.connections[connection].stream;
                yield sendEvent(stream, eventType, data);
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
exports.broadcast = broadcast;
function sendEvent(stream, event, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield stream.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    });
}
function removeUserAndConnection(username) {
    try {
        delete exports.connections[username];
        (0, db_1.removeUser)(username);
    }
    catch (error) {
        console.log(error);
    }
}
exports.removeUserAndConnection = removeUserAndConnection;
