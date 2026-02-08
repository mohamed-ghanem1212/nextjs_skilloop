"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode, useEffect, useState } from "react";
import SkillProvider from "../skillProvider/SkillProvider";
import { SECTION, Skill } from "../../types.entities/skillData.types";
import { createSkillApi } from "@/lib/skill.axios";
import axios from "axios";
import { toast } from "sonner";
import { SkeletonCard } from "../skeletonCard/SkeletonCard";

function ShowProviders({ skillSection }: { skillSection: SECTION }): ReactNode {
  const [skills, setSkill] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await createSkillApi.get(
          `/getSkillsBySection?section=${skillSection}`,
        );

        setSkill(res.data.skills);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.message);
        } else {
          setLoading(false);

          toast.error("Something went wrong please try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-330"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-7">
          {skills.length > 0 ? (
            skills
              .filter((skill) => skill.userId !== null)
              .map((skill) => (
                <CarouselItem
                  key={skill._id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <SkillProvider skill={skill} />
                </CarouselItem>
              ))
          ) : (
            <div className="flex flex-row gap-7 justify-center h-full w-full py-8">
              <div className="flex justify-center w-full max-w-70 xl:max-w-90">
                <SkeletonCard />
              </div>
              <div className="hidden md:flex justify-center w-full max-w-70 xl:max-w-90">
                <SkeletonCard />
              </div>
              <div className="hidden lg:flex justify-center w-full max-w-70 xl:max-w-90">
                <SkeletonCard />
              </div>
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious className="xl:flex hidden" />
        <CarouselNext className="xl:flex hidden" />
      </Carousel>
    </div>
  );
}

export default ShowProviders;
