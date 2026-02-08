import ShowProviders from "@/components/showProviders/ShowProviders";

import Image from "next/image";
import { ReactNode } from "react";
import creativity from "../../../../public/images/art&design.jpg";
import ShowSkillOffers from "@/components/showSkillOffers/ShowSkillOffers";
import { SECTION } from "../../../types.entities/skillData.types";

function Creativity(): ReactNode {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-orange-900 flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
        <div className="w-200 flex flex-col gap-4 px-9">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">
            Create, Design, and Express Visually
          </h2>
          <p className="text-center text-white">
            Unleash your creativity through design and visual arts. Explore
            UI/UX, graphic design, motion, and digital art skills that help you
            communicate ideas beautifully and craft experiences that truly
            connect with users.
          </p>
        </div>
        <div className="w-200 h-full">
          <Image src={creativity} alt="Creativity" />
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
        <div className="space-y-3 w-full max-w-350">
          <h1 className="font-bold text-xl">Choose Your Learning Provider</h1>
          <ShowProviders skillSection={SECTION.ART_DESIGN} />
        </div>
        <div className="h-0.5 w-[70%] max-w-4xl bg-gray-200 m-10"></div>
        <div className="space-y-3 w-full max-w-350">
          <h1 className="font-bold text-xl">Available Skill Requests</h1>
          <ShowSkillOffers offerSection={SECTION.ART_DESIGN} />
        </div>
      </div>
    </div>
  );
}
export default Creativity;
