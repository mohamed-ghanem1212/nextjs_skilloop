"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import authImg from "../../../public/images/12085707_20944201.jpg";
import Input from "@/components/input/Input";
import { lvl, sections, SelectSection } from "@/components/selection/Selection";
import SignUp from "@/components/authComp/Register";
import Login from "@/components/authComp/Login";

function Register(): ReactNode {
  const [isUser, setIsUser] = useState<boolean>(false);

  const handleToggle = () => {
    setIsUser((prev: boolean) => !prev);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-5 md:gap-8 justify-center xl:gap-12 items-center w-full px-4 sm:px-6 md:px-10 xl:px-20 py-8 xl:py-20 overflow-hidden">
      <div className="flex flex-col xl:w-[50%] text-center md:text-start w-full max-w-2xl items-center">
        {/* Mobile Image */}
        <div className="md:hidden flex w-full items-center justify-center mb-5">
          <Image
            src={authImg}
            alt="Authentication illustration"
            className="object-cover select-none w-full max-w-sm h-auto"
            width={400}
            height={400}
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-9 w-full">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-xl font-semibold px-2">
            <p className="text-lg sm:text-xl md:text-[28px] lg:text-[30px] leading-tight xl:text-start text-center">
              Become a provider on{" "}
              <strong className="text-blue-700 font-bold">Skilloop</strong> and
              unlock new opportunities to showcase your services and grow your
              business.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-[20px] leading-tight">
              Sign in or create an account to start offering your services
              today!
            </p>
          </div>

          {/* Form Slider */}
          <div className="relative overflow-hidden w-full max-w-md lg:max-w-lg">
            <div
              className={`flex w-[200%] transition-transform duration-300 ease-in-out mt-5
                ${!isUser ? "-translate-x-1/2" : "translate-x-0"}`}
            >
              <div className="w-1/2 px-2 sm:px-4">
                <SignUp toggle={handleToggle} className={""} />
              </div>

              <div className="w-1/2 px-2 sm:px-4">
                <Login toggle={handleToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:flex xl:w-[50%] items-center justify-center">
        <Image
          src={authImg}
          alt="Authentication illustration"
          className="object-cover select-none w-full max-w-md lg:max-w-lg xl:max-w-2xl h-auto"
          width={700}
          height={700}
          priority
        />
      </div>
    </div>
  );
}

export default Register;
