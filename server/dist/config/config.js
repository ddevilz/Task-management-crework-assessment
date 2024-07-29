"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvVar(name, defaultValue) {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${name} is required but not defined`);
    }
    return value || defaultValue;
}
function getNumberEnvVar(name, defaultValue) {
    const value = process.env[name];
    const parsed = parseInt(value || "", 10);
    if (isNaN(parsed)) {
        if (value === undefined) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${name} must be a number`);
    }
    return parsed;
}
exports.config = {
    PORT: getNumberEnvVar("PORT", 3000),
    MONGODB_URL: getEnvVar("MONGODB_URL"),
    JWT_SECRET: getEnvVar("JWT_SECRET"),
    JWT_EXPIRY: getEnvVar("JWT_EXPIRY"),
};
//# sourceMappingURL=config.js.map