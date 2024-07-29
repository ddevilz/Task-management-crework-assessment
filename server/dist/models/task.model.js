"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../enums/enums");
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: Object.values(enums_1.TaskStatus),
        required: [true, "Status is required"],
        default: enums_1.TaskStatus.TO_DO,
    },
    priority: {
        type: String,
        enum: Object.values(enums_1.TaskPriority),
        default: enums_1.TaskPriority.LOW,
    },
    deadline: {
        type: Date,
        default: null,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=task.model.js.map