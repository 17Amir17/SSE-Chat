"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefreshTokenValid = exports.removeRefreshToken = exports.validateToken = exports.generateToken = exports.generateRefreshToken = exports.generateAccessToken = exports.compare = exports.encrypt = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET || 'secret';
const validRefreshTokens = {};
function encrypt(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(password, salt);
}
exports.encrypt = encrypt;
function compare(hash, password) {
    return bcrypt_1.default.compareSync(password, hash);
}
exports.compare = compare;
function generateAccessToken(data) {
    return generateToken(data, '10h');
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(data) {
    const token = generateToken(data, '1h');
    validRefreshTokens[token] = data;
    return token;
}
exports.generateRefreshToken = generateRefreshToken;
function generateToken(data, exp) {
    return jsonwebtoken_1.default.sign(data, SECRET, {
        expiresIn: exp,
    });
}
exports.generateToken = generateToken;
function validateToken(accessKey) {
    try {
        return jsonwebtoken_1.default.verify(accessKey, SECRET);
    }
    catch (error) {
        return false;
    }
}
exports.validateToken = validateToken;
function removeRefreshToken(data) {
    try {
        for (const token in validRefreshTokens) {
            if (validRefreshTokens[token] === data) {
                delete validRefreshTokens[token];
                return;
            }
        }
    }
    catch (error) { }
}
exports.removeRefreshToken = removeRefreshToken;
function isRefreshTokenValid(token) {
    return !!validRefreshTokens[token];
}
exports.isRefreshTokenValid = isRefreshTokenValid;
