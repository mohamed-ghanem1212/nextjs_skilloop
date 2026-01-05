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
    <div className="flex flex-col xl:flex-row gap-5 md:gap-0 justify-center xl:m-20 items-center">
      <div className="flex flex-col xl:w-[50%] text-center md:text-start w-full items-center ">
        <div className="md:hidden flex xl:w-[50%] items-center justify-center mb-5">
          <Image
            src={authImg}
            alt=""
            className="object-cover select-none"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col items-center gap-9">
          <div className="w-sm flex flex-col items-center gap-6">
            <p className="text-xl md:text-[30px] leading-tight xl:text-start text-center">
              Become a provider on{" "}
              <strong className="text-blue-700 font-bold">Skilloop</strong> and
              unlock new opportunities to showcase your services and grow your
              business.
            </p>
            <p className="text-sm md:text-[20px] leading-tight">
              Sign in or create an account to start offering your services
              today.
            </p>
          </div>

          <div className="relative overflow-hidden w-full md:w-125">
            <div
              className={`flex w-[200%] transition-transform duration-300 ease-in-out mt-5
      ${!isUser ? "-translate-x-1/2" : "translate-x-0"}`}
            >
              <div className="w-1/2 px-4">
                <SignUp toggle={handleToggle} className={""} />{" "}
              </div>

              <div className="w-1/2 px-4">
                <Login toggle={handleToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={authImg}
          alt=""
          className="object-cover select-none"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
}
export default Register;
