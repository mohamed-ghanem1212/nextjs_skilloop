import { ReactNode } from "react";
import Image from "next/image";
import background from "../../../public/images/2148111398.jpg";
import Button from "@/components/button/Button";

import Section, { skills, skillType } from "@/components/section/Section";
import Link from "next/link";

function Discover(): ReactNode {
  return (
    <div>
      <div className="">
        <div className="w-full h-140 md:h-180 bg-black relative  md:rounded-b-[250px]">
          <Image
            src={background}
            alt=""
            className="object-cover w-full h-full opacity-40 md:rounded-b-[250px]"
          />
          <div className="absolute px-4 lg:px-0 -translate-x-1/2 top-[50%] -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 lg:top-48 left-[50%] lg:left-28 w-full lg:w-[40%] flex flex-col gap-8 lg:text-start text-center lg:items-start items-center">
            <h2 className="text-white  text-3xl md:text-7xl font-bold">
              Turn Your Skills Into Real Impact
            </h2>
            <p className="text-white text-2xl">
              Share what you know, connect with learners, and create meaningful
              opportunities through your expertise.
            </p>
            <Link href={"/home"}>
              <Button
                name="Explore Us"
                bgColor="bg-white"
                textColor="text-black"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center mt-12 justify-center text-center w-full lg:px-0">
          <div className="flex flex-col  gap-6 px-3">
            <h3 className="md:text-4xl text-xl font-bold">
              Explore Skills That Inspire Growth
            </h3>
            <p className="md:text-2xl text-md">
              Discover a wide range of skills shared by experienced providers,
              and start learning or offering what you love.
            </p>
          </div>
          <div className="flex flex-col bg-gray-200 mt-10 py-12 w-full gap-20">
            {skills.map((skill: skillType) => {
              return (
                <Section
                  key={skill.slug}
                  path={`/discover/${skill.slug}`}
                  img={skill.img}
                  title={skill.title}
                  description={skill.description}
                  order={skill.order || "lg:order-2"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Discover;
