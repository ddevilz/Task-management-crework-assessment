"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
};
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields required!" });
        return;
    }
    const existingEmail = await user_model_1.default.findOne({ email });
    if (existingEmail) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const user = await user_model_1.default.create({ name, email, password });
    const token = user.generateJWTToken();
    res.cookie("token", token, cookieOptions);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields required!" });
        return;
    }
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    const token = user.generateJWTToken();
    res.cookie("token", token, cookieOptions);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});
const logout = (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
        (0, auth_middleware_1.invalidateToken)(token);
    }
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map