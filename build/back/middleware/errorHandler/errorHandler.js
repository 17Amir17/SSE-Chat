"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = __importDefault(require("./errorCodes"));
const errorHandler = (err, _req, res, _next) => {
    for (const error in errorCodes_1.default) {
        if (errorCodes_1.default[error].message === err.message) {
            res
                .status(errorCodes_1.default[error].code)
                .json({ message: errorCodes_1.default[error].message });
            return;
        }
    }
    res.status(500).send(err.message);
};
exports.default = errorHandler;
