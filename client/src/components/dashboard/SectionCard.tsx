"use client"
import Image from "next/image";
import React from "react";

interface SectionData {
  imageSrc: string;
  title: string;
  description: string;
}

interface SectionCardProps {
  data: SectionData;
}

const SectionCard: React.FC<SectionCardProps> = ({ data }) => {
  return (
    <div className="flex grow gap-2 p-2 w-full bg-[#F4F4F4] rounded-lg   max-md:mt-2">
      <Image
        src={data.imageSrc}
        alt={data.title}
        className="shrink-0 my-auto aspect-[1.09] "
        width={76}
        height={76}
      />
      <div className="flex flex-col flex-1">
        <div className="text-base font-semibold text-neutral-500">
          {data.title}
        </div>
        <div className="mt-1 text-sm text-zinc-500">{data.description}</div>
      </div>
    </div>
  );
};

export default SectionCard;
