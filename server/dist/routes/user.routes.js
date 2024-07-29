"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const UserRouter = express_1.default.Router();
UserRouter.post("/register", user_controller_1.register);
UserRouter.post("/login", user_controller_1.login);
UserRouter.post("/logout", auth_middleware_1.verifyToken, user_controller_1.logout);
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map