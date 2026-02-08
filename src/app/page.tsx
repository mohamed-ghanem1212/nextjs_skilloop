import Image from "next/image";
import Register from "@/components/authComp/Register";
import { ReactNode } from "react";
import pic from "../../public/images/13450332_OrgCoral_Ofc-02_Concept-04.jpg";
import Button from "@/components/button/Button";
import Link from "next/link";
export default function Home(): ReactNode {
  return (
    <div className="flex flex-col xl:flex-row gap-5 md:gap-0 justify-center xl:px-20 xl:m-20">
      <div className="xl:w-1/2 text-center md:text-start w-full xl:items-start items-center flex flex-col">
        <div className="xl:hidden mb-5">
          <Image
            src={pic}
            alt=""
            className="object-cover select-none"
            width={400}
            height={400}
          />
        </div>
        <h1 className="text-3xl text-blue-700 font-bold mb-6">
          Reach new skills
        </h1>
        <p className="text-xl xl:text-[68px] font-bold leading-tight">
          Tailored skill solutions for modern professionals.
        </p>
        <div className="flex flex-col xl:flex-row gap-7 mt-14 items-center md:px-0 px-5">
          <Link href="/home">
            <Button name="Get start" bgColor="bg-black" />
          </Link>
          <p className="text-gray-600 text-center md:text-start text-[15px] md:text-[18px]">
            Unlock your potential and grow your expertise. Master the skills
            that set you apart and elevate your career.
          </p>
        </div>
      </div>
      <div className="hidden xl:block ">
        <Image
          src={pic}
          alt=""
          className="object-cover select-none"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
