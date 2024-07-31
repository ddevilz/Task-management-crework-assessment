export enum TaskStatus {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  UNDER_REVIEW = "Under Review",
  FINISHED = "Finished",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  URGENT = "Urgent",
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
