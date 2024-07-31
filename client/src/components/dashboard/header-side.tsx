"use client";
import { BellDot, ChevronsRight, Loader } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const HeaderSide = () => {
  const logout = () => {};

  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <Image src={"/avatars/image.png"} width={30} height={30} alt={""} />
          <span className="font-bold">Joe Gardner</span>
        </div>
        <div className="my-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellDot />
            <Loader />
            <ChevronsRight />
          </div>
          <div>
            <Button variant={"ghost"} onClick={logout} size={"sm"}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSide;
