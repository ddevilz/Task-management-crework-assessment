import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "@/components/dashboard/TaskCard";
import { Task, TaskStatus } from "@/types";
import CreateTaskBtn from "./create-task-btn";
import { CirclePlus, Plus } from "lucide-react";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ status, tasks }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-64">
      <h2 className="font-bold mb-4">{status}</h2>
      <Droppable droppableId={status.toString()}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <TaskCard key={task._id.toString()} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CreateTaskBtn
        status={status}
        className="bg-gradient-to-b from-[#2a2933] to-[#040404] p-2 justify-between text-white"
      >
        <span>Add new</span>
        <Plus />
      </CreateTaskBtn>
    </div>
  );
};

export default Column;
