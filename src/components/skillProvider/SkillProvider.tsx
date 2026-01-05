import { ReactNode } from "react";
import Image from "next/image";
import devImage from "../../../public/images/2148514859.jpg";
import ReadMoreText from "../ReadText/ReadText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function SkillProvider(): ReactNode {
  return (
    <div className=" flex flex-col items-center self-start p-3 border h-105 xl:h-118 rounded-xl m-5 w-87 xl:w-100 hover:shadow-lg duration-200 hover:bg-gray-200 cursor-pointer hover:scale-105 select-none">
      <div className="w-64 xl:w-full overflow-hidden rounded-xl">
        <Image src={devImage} alt="Skill Provider" className="w-full h-full" />
      </div>
      <div className="flex flex-col h-32 items-start w-full px-4 py-3 gap-3">
        <h4 className="text-sm font-bold">
          Comprehensive AI Engineering Track: From Foundations to
          Production-Ready Systems
        </h4>
        <div className="flex flex-row">
          <p className="text-[10px] font-medium">By John Doe</p>
          <span className="text-[10px] font-medium mx-2">|</span>
          <p className="text-[10px] font-medium">4.8 ⭐ (1.2k Reviews)</p>
        </div>
        <ReadMoreText
          text="I’m [Instructor Name], an AI Engineer with hands-on experience in
          building and deploying real-world AI solutions. In this track, I’ll
          guide you through the complete AI engineering workflow—starting with
          data preparation and model fundamentals, moving into training and
          evaluation, and ending with deploying AI models into scalable,
          production-ready applications using modern tools and best practices."
        />
      </div>
    </div>
  );
}
export default SkillProvider;
