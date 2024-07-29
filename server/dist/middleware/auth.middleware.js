"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const blacklist = [];
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    if (blacklist.includes(token)) {
        return res.status(401).json({ message: "Token has been invalidated." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        req.user = {
            id: decoded._id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: "Token has expired." });
        }
        res.status(400).json({ message: "Invalid token." });
    }
};
exports.verifyToken = verifyToken;
const invalidateToken = (token) => {
    blacklist.push(token);
};
exports.invalidateToken = invalidateToken;
//# sourceMappingURL=auth.middleware.js.map