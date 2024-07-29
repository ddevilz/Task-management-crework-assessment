"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const TaskRouter = express_1.default.Router();
TaskRouter.post("/create", auth_middleware_1.verifyToken, task_controller_1.createTask);
TaskRouter.get("/all", auth_middleware_1.verifyToken, task_controller_1.getTasks);
TaskRouter.get("/:id", auth_middleware_1.verifyToken, task_controller_1.getTask);
TaskRouter.put("/:id", auth_middleware_1.verifyToken, task_controller_1.updateTask);
TaskRouter.delete("/:id", auth_middleware_1.verifyToken, task_controller_1.deleteTask);
exports.default = TaskRouter;
//# sourceMappingURL=task.routes.js.map