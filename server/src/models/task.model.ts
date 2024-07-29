import mongoose, { Document, Schema, Model } from "mongoose";
import { TaskStatus, TaskPriority } from "../enums/enums";

interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: Date;
  user: any;
}

const taskSchema: Schema<ITask> = new mongoose.Schema(
  {
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
      enum: Object.values(TaskStatus),
      required: [true, "Status is required"],
      default: TaskStatus.TO_DO,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.LOW,
    },
    deadline: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
