"use client";
import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "@/components/dashboard/Column";
import { useTasks, useUpdateTaskStatus } from "@/hooks/useTask";
import { Task, TaskStatus } from "@/types";

const TaskBoard: React.FC = () => {
  const { tasks, isLoading, isError } = useTasks();
  const updateTaskStatus = useUpdateTaskStatus();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateTaskStatus(draggableId, destination.droppableId as TaskStatus);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.values(TaskStatus).map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks?.filter((task) => task.status === status) || []}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
