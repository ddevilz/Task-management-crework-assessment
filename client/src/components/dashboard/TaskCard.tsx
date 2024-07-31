import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task, TaskPriority } from "@/types";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded shadow"
        >
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <div className="flex justify-between mt-2">
            <span
              className={`px-2 py-1 rounded text-xs ${
                task.priority === TaskPriority.URGENT
                  ? "bg-red-200 text-red-800"
                  : task.priority === TaskPriority.MEDIUM
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
