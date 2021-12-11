"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const loginRouter_1 = __importDefault(require("./routers/loginRouter"));
const messageRouter_1 = __importDefault(require("./routers/messageRouter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler/errorHandler"));
const messageHandler_1 = __importDefault(require("./middleware/messageHandler"));
const app = (0, express_1.default)();
//Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Morgan Freeman
morgan_1.default.token('body', (req, _res) => {
    return JSON.stringify(req.body);
});
app.use((0, morgan_1.default)(':method :url :body'));
//Routers
app.use('/login', loginRouter_1.default);
app.use('/message', messageHandler_1.default, messageRouter_1.default);
//Static route
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build/')));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
//Error handler
app.use(errorHandler_1.default);
module.exports = app;
