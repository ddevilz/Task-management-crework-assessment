import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import TableUtil from "@/components/dashboard/table-util";
import TaskBoard from "@/components/Taskboard";
import Image from "next/image";
// Header component

// Sidebar component

// TaskColumn component
const TaskColumn = ({ title, tasks }: any) => (
  <div className="flex-1 bg-gray-100 p-4 rounded">
    <h2 className="font-bold mb-4">{title}</h2>
    {tasks.map((task: any, index: any) => (
      <div key={index} className="bg-white p-2 mb-2 rounded shadow">
        <p>{task.name}</p>
        <div className="flex justify-between items-center mt-2">
          <span className={`px-2 py-1 rounded text-xs ${task.priorityColor}`}>
            {task.priority}
          </span>
          <span className="text-xs text-gray-500">{task.time}</span>
        </div>
      </div>
    ))}
  </div>
);

// Main content component
const Dashboard = () => (
  <div className="flex-1 p-4">
    <div className="flex space-x-4">
      <TaskColumn
        title="To do"
        tasks={[
          {
            name: "Implement User Authentication",
            priority: "High",
            priorityColor: "bg-red-200 text-red-800",
            time: "2 days ago",
          },
          // Add more tasks...
        ]}
      />
      <TaskColumn
        title="In progress"
        tasks={[
          {
            name: "Design Home Page UI",
            priority: "Medium",
            priorityColor: "bg-orange-200 text-orange-800",
            time: "1 hr ago",
          },
          // Add more tasks...
        ]}
      />
      <TaskColumn
        title="Under review"
        tasks={[
          {
            name: "Conduct User Feedback",
            priority: "Low",
            priorityColor: "bg-green-200 text-green-800",
            time: "3 hr ago",
          },
          // Add more tasks...
        ]}
      />
      <TaskColumn
        title="Finished"
        tasks={[
          {
            name: "Test Cross-Browser Compatibility",
            priority: "Completed",
            priorityColor: "bg-blue-200 text-blue-800",
            time: "2 days ago",
          },
          // Add more tasks...
        ]}
      />
    </div>
  </div>
);
export default function Home() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-200">
        <Header />
        <TableUtil />
        <TaskBoard />
      </div>
    </main>
  );
}
