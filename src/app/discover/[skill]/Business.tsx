import ShowProviders from "@/components/showProviders/ShowProviders";
import Image from "next/image";
import { ReactNode } from "react";
import business from "../../../../public/images/Business.jpg";
function Business(): ReactNode {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-cyan-800 flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
        <div className="w-200 flex flex-col gap-4 items-center px-9">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">
            Turn Skills into Sustainable Success
          </h2>
          <p className="text-center text-white">
            Master the fundamentals of business and entrepreneurship. From
            management and freelancing to strategy and productivity, this
            section helps you transform skills into real opportunities and
            long-term growth.
          </p>
        </div>
        <div className="w-200 h-full">
          <Image src={business} alt="Development" />
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
        <h1>Choose Your Learning Provider</h1>
        <ShowProviders />
      </div>
    </div>
  );
}
export default Business;
