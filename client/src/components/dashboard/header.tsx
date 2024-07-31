"use client";
import React from "react";
import Image from "next/image";
import SectionCard from "./SectionCard";
import { CircleHelp } from "lucide-react";

interface SectionData {
  imageSrc: string;
  title: string;
  description: string;
}

interface SectionCardProps {
  data: SectionData;
}

const sectionData: SectionData[] = [
  {
    imageSrc: "/header/first.png",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    imageSrc: "/header/second.png",
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    imageSrc: "/header/third.png",
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

const Header: React.FC = () => {
  return (
    <div className="flex flex-col my-12">
      <div className="flex gap-5 justify-between px-5 w-full text-zinc-950 max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl font-semibold max-md:text-4xl">
          Good morning, Joe!
        </div>
        <div className="flex gap-2 my-auto text-base">
          <div className="my-auto">Help & feedback</div>
          <CircleHelp />
        </div>
      </div>
      <div className="px-5 mt-4 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {sectionData.map((data, index) => (
            <div
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              key={index}
            >
              <SectionCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
