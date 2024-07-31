import useSWR from "swr";
import { Task, TaskStatus } from "@/types";
import { BASE_URL } from "@/api";
import getCookie from "@/actions/getCookie";

// Fetcher function with token handling
const fetcher = async (url: string) => {
  const token = await getCookie();
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
};

// Hook to fetch tasks
export function useTasks() {
  const { data, error, mutate } = useSWR<{ tasks: Task[] }>(
    `${BASE_URL}/task/all`,
    fetcher
  );

  return {
    tasks: data?.tasks,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

// Hook to update task status
export function useUpdateTaskStatus() {
  const { mutate } = useTasks();

  const updateTask = async (id: string, status: TaskStatus) => {
    const token = await getCookie();
    const res = await fetch(`${BASE_URL}/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const error = new Error("An error occurred while updating the task.");
      throw error;
    }

    const updatedTask = await res.json();

    // Optimistic update
    mutate((tasks) => {
      if (!tasks) return tasks;
      return {
        tasks: tasks.tasks.map((task) =>
          task._id === id ? { ...task, status } : task
        ),
      };
    }, false);

    return updatedTask;
  };

  return updateTask;
}
