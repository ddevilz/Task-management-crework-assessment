"use client";
import React from "react";
import HeaderSide from "./header-side";
import { ArrowDownToLine, CirclePlus } from "lucide-react";
import Navigation from "./navigation";
import CreateTaskBtn from "./create-task-btn";

const Sidebar = () => {
  return (
    <aside className="w-64 p-3 my-3 flex flex-col justify-between">
      <div>
        <HeaderSide />
        <Navigation />
        <CreateTaskBtn className="w-full h-12 p-4 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-white ">
          <span className="flex-1 text-center">Create new task</span>
          <CirclePlus className="h-6 w-6" />
        </CreateTaskBtn>
      </div>
      <div>
        <div className="flex flex-col justify-center  text-stone-500">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-100">
            <ArrowDownToLine />
            <div className="flex flex-col flex-1 px-5">
              <span className="text-base font-medium ">Download the app</span>
              <small className="mt-1">Get the full experience </small>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
