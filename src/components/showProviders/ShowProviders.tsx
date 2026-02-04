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
import { Skill } from "../../../.next/dev/types/skillData.types";
import { createSkillApi } from "@/lib/skill.axios";
import axios from "axios";
import { toast } from "sonner";

function ShowProviders(): ReactNode {
  const [skills, setSkill] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await createSkillApi.get("/getAllSkills");
        setSkill(res.data.getSkills);
        console.log(res.data);

        setLoading(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log("STATUS:", err.response?.status);
          console.log("DATA:", err.response?.data);
          toast.error(err.response?.data.message);
          console.log("HEADERS:", err.response?.headers);
          setLoading(false);
        } else {
          console.log("UNEXPECTED:", err);
          toast.error("Something went wrong please try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-80 md:w-225 xl:w-360 "
    >
      <CarouselContent>
        {skills.length > 0 ? (
          skills
            .filter((skill) => skill.userId !== null)
            .map((skill) => (
              <CarouselItem
                key={skill._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex items-center justify-center w-full">
                  <SkillProvider skill={skill} />
                </div>
              </CarouselItem>
            ))
        ) : (
          <div className="h-full w-full text-center">
            <p>No Skills shown</p>
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ShowProviders;
