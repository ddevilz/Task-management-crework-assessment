"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app_1 = __importDefault(require("../app"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(config_1.config.MONGODB_URL);
        console.log("Connected to the database.");
        app_1.default.on("error", (err) => {
            console.error("App Error: ", err);
            throw err;
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Database error: ", error.message);
        }
        process.exit(1);
    }
};
exports.default = connectDb;
//# sourceMappingURL=db.js.map