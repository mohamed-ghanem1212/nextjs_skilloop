import ShowProviders from "@/components/showProviders/ShowProviders";
import Image from "next/image";
import { ReactNode } from "react";
import Other from "../../../../public/images/skill.jpg";
function OtherSkills(): ReactNode {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400 flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
        <div className="w-200 flex flex-col gap-4 px-9">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">
            Expand Your Knowledge Beyond Boundaries
          </h2>
          <p className="text-center text-white">
            Explore a wide range of additional skills that don’t fit into a
            single category but are just as powerful. From personal development
            to emerging fields, this space is all about learning, adaptability,
            and continuous growth.
          </p>
        </div>
        <div className="w-200 h-full">
          <Image src={Other} alt="Development" />
        </div>
      </div>
      <div className="w-200">
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
      <div>
        <ShowProviders />
      </div>
    </div>
  );
}
export default OtherSkills;
