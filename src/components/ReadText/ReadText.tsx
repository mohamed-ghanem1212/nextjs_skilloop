"use client";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
export default function ReadMoreText({ text }: { text: string }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <p className={`text-gray-600 text-[13px] ${!open ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      <div className="flex flex-row justify-between items-center mt-3">
        <HoverCard>
          <HoverCardTrigger>
            <button className="mt-2 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
              {open ? "Read less" : "Read more"}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="font-bold">{text}</HoverCardContent>
        </HoverCard>
        <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-900 duration-150 cursor-pointer">
          Contact
        </Button>
      </div>
    </div>
  );
}
