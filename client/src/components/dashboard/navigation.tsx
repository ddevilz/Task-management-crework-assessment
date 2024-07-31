"use client";
import React from "react";
import { ChartLine, House, Settings, SquareKanban } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-white py-4">
      <ul className="flex flex-col ">
        <li className="flex items-center  justify-start">
          <button className="flex items-center w-full p-2 rounded-md bg-gray-200 text-gray-800">
            <House className="h-5 w-5" />
            <span className="ml-2">Home</span>
          </button>
        </li>
        <li className="flex items-center  justify-start">
          <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100">
            <SquareKanban className="h-5 w-5" />
            <span className="ml-2">Boards</span>
          </button>
        </li>
        <li className="flex items-center  justify-start">
          <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100">
            <Settings className="h-5 w-5" />
            <span className="ml-2">Settings</span>
          </button>
        </li>
        <li className="flex items-center  justify-start">
          <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100">
            <ChartLine className="h-5 w-5" />
            <span className="ml-2">Analytics</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
