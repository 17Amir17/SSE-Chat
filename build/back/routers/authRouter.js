"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = require("../controller/registerController");
const loginController_1 = require("../controller/loginController");
const errorCodes_1 = __importDefault(require("../middleware/errorHandler/errorCodes"));
const auth_tools_1 = require("../auth_tools/auth_tools");
const utils_1 = require("../services/utils");
const router = express_1.default.Router();
router.post('/register', registerController_1.register);
router.post('/login', loginController_1.login);
router.post('/token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        throw errorCodes_1.default.noRefreshToken;
    if (!(0, auth_tools_1.isRefreshTokenValid)(refreshToken))
        throw errorCodes_1.default.badToken;
    const user = {
        username: (0, utils_1.validateNonSensativeUser)((0, auth_tools_1.validateToken)(refreshToken)).username,
    };
    const accessToken = (0, auth_tools_1.generateAccessToken)(user);
    res.json({ accessToken });
});
exports.default = router;
