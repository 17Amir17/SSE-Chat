"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const router = express_1.default.Router();
router.post('/send', (req, res) => {
    (0, chatController_1.onSend)(req, res);
});
router.get('/stream', (req, res) => {
    (0, chatController_1.stream)(req, res);
});
router.get('/userList', (req, res) => {
    (0, chatController_1.getUsers)(req, res);
});
router.get('/history', (req, res) => {
    (0, chatController_1.getHistory)(req, res);
});
router.post('/typing', (req, res) => {
    (0, chatController_1.userTyping)(req, res);
});
exports.default = router;
