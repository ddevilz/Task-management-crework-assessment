"use client";
import * as React from "react";
import {
  Search,
  Calendar,
  Sparkles,
  Filter,
  Share2,
  CirclePlus,
} from "lucide-react";
import CreateTaskBtn from "./create-task-btn";
import { Input } from "../ui/input";

const TableUtil: React.FC = () => {
  return (
    <div className="px-4 flex gap-5 justify-between w-full items-center text-base max-md:flex-wrap">
      <div className="relative bg-white rounded-xl border border-gray-200 border-solid text-neutral-500">
        <Input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none py-2 pl-4 pr-10"
        />
        <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 text-neutral-500" />
      </div>
      <div className="flex max-md:flex-wrap text-[13px]">
        <div className="flex gap-4 px-5 text-neutral-500 max-md:flex-wrap">
          <div className="flex w-[132px] p-2 rounded items-center gap-1">
            <div className="my-auto ">Calendar view</div>
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex items-center p-2 whitespace-nowrap rounded gap-1">
            <div className="my-auto">Automation</div>
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex items-center p-2 whitespace-nowrap rounded gap-1">
            <div className="my-auto">Filter</div>
            <Filter className="w-6 h-6" />
          </div>
          <div className="flex items-center p-2 whitespace-nowrap rounded gap-1">
            <div className="my-auto">Share</div>
            <Share2 className="w-6 h-6" />
          </div>
        </div>
        <CreateTaskBtn className="bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-white p-2">
          <div className="my-auto">Create new</div>
          <CirclePlus className="w-6 h-6" />
        </CreateTaskBtn>
      </div>
    </div>
  );
};

export default TableUtil;
