"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    const user = req.user?.id;
    if (!title || !status || !user) {
        res.status(400).json({ message: "Title, status, and user are required" });
        return;
    }
    const task = await task_model_1.default.create({
        title,
        description,
        status,
        priority,
        deadline,
        user,
    });
    res.status(201).json({
        success: true,
        task,
    });
});
exports.getTasks = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const tasks = await task_model_1.default.find().populate("user", "name email");
    res.status(200).json({
        success: true,
        tasks,
    });
});
exports.getTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const task = await task_model_1.default.findById(id).populate("user", "name email");
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.status(200).json({
        success: true,
        task,
    });
});
exports.updateTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    const user = req.user?.id;
    const taskUser = await task_model_1.default.findById(req.params.id);
    if (!taskUser) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    if (taskUser.user.toString() !== user) {
        res
            .status(403)
            .json({ message: "You are not authorized to update this task" });
        return;
    }
    const task = await task_model_1.default.findByIdAndUpdate(req.params.id, { title, description, status, priority, deadline }, { new: true, runValidators: true }).populate("user", "name email");
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.status(200).json({
        success: true,
        task,
    });
});
exports.deleteTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const task = await task_model_1.default.findByIdAndDelete(req.params.id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    });
});
//# sourceMappingURL=task.controller.js.map