import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";

const TaskRouter = express.Router();

TaskRouter.post("/create", verifyToken, createTask);

TaskRouter.get("/all", verifyToken, getTasks);

TaskRouter.get("/:id", verifyToken, getTask);

TaskRouter.put("/:id", verifyToken, updateTask);

TaskRouter.delete("/:id", verifyToken, deleteTask);

export default TaskRouter;
