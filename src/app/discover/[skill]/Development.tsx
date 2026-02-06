import { ReactNode } from "react";
import Image from "next/image";
import devImage from "../../../../public/images/development_second.jpg";
import ShowProviders from "@/components/showProviders/ShowProviders";
import ShowSkillOffers from "@/components/showSkillOffers/ShowSkillOffers";

function Development(): ReactNode {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <div className="bg-blue-950 flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
        <div className="max-w-2xl flex flex-col gap-4 px-6 md:px-9 py-8">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">
            Build the Technology Behind Ideas
          </h2>
          <p className="text-center text-white">
            Welcome to the Development section, where ideas begin to take shape.
            This space is dedicated to building strong problem-solving
            foundations, structured thinking, and practical approaches that turn
            concepts into meaningful digital outcomes.
          </p>
        </div>
        <div className="w-full lg:w-1/2 h-full">
          <Image
            src={devImage}
            alt="Development"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="max-w-5xl w-full px-6">
        <h3 className="text-2xl font-bold mt-10 mb-6 text-center">
          Welcome to the Experts Behind the Section
        </h3>
        <p className="text-center mb-10">
          Here, experienced developers share their knowledge, guiding you
          through the intricacies of coding, software design, and technology
          implementation. Whether you're a beginner or looking to enhance your
          skills, our providers are here to help you navigate the ever-evolving
          world of development.
        </p>
      </div>

      <div className="flex flex-col items-center w-full px-6">
        <div className="space-y-3 w-full max-w-7xl">
          <h1 className="font-bold text-xl">Choose Your Learning Provider</h1>
          <ShowProviders />
        </div>
        <div className="h-0.5 w-[70%] max-w-4xl bg-gray-200 m-10"></div>
        <div className="space-y-3 w-full max-w-7xl">
          <h1 className="font-bold text-xl">Available Skill Requests</h1>
          <ShowSkillOffers />
        </div>
      </div>
    </div>
  );
}

export default Development;
