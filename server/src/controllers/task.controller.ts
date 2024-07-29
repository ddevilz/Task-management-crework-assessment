import { Request, Response } from "express";
import Task from "../models/task.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;
  const user = req.user?.id;

  if (!title || !status || !user) {
    res.status(400).json({ message: "Title, status, and user are required" });
    return;
  }

  const task = await Task.create({
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

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find().populate("user", "name email");

  res.status(200).json({
    success: true,
    tasks,
  });
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate("user", "name email");

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({
    success: true,
    task,
  });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;

  const user = req.user?.id;
  const taskUser = await Task.findById(req.params.id);

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

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, status, priority, deadline },
    { new: true, runValidators: true }
  ).populate("user", "name email");

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({
    success: true,
    task,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
