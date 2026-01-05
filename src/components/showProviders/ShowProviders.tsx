import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";
import SkillProvider from "../skillProvider/SkillProvider";

// 50% on small screens and 33% on larger screens.

function ShowProviders(): ReactNode {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-80 md:w-225 xl:w-360 "
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="flex items-center justify-center w-full">
              <SkillProvider />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ShowProviders;
