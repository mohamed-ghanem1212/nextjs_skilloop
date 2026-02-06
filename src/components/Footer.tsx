import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";
import logo from "../../public/images/255893252_d184c32b-9410-4627-881c-e3db80456315.svg";
function Footer(): ReactNode {
  return (
    <footer className="w-full p-16 text-center">
      <div className="flex flex-col items-center mb-5">
        <h3 className="md:text-4xl text-2xl font-bold mb-12">
          A smarter way to offer and discover skills.
        </h3>
        <h5 className="md:text-2xl text-xl">
          Turning talent into opportunity.
        </h5>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full p-10 text-center">
        <div className="flex flex-row items-center cursor-pointer">
          <Link href={"home"}>
            <Image
              src={logo}
              alt=""
              className="object-cover"
              width={200}
              height={200}
            />
          </Link>
          <h3 className="text-2xl font-bold">Skilloop</h3>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Platform</h1>
          <div className="flex flex-col mt-3 gap-5">
            <Link href={"home"} className="hover:text-blue-700 duration-200">
              Home
            </Link>
            <Link
              href={"/discover"}
              className="hover:text-blue-700 duration-200"
            >
              Discover
            </Link>
            <Link href={"/about"} className="hover:text-blue-700 duration-200">
              About Us
            </Link>
            <Link
              href={"/contact"}
              className="hover:text-blue-700 duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Get in touch</h1>
          <div className="flex flex-col gap-1 mt-4">
            <Link
              href={"/contact"}
              className="hover:text-blue-700 duration-200"
            >
              <h5>+1-123-4567-2345</h5>
            </Link>
            <Link
              href={"/contact"}
              className="hover:text-blue-700 duration-200"
            >
              <h5>skilloop@gmail.com</h5>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-200 m-5"></div>
      <h3 className="text-gray-700">
        Copyright 2026 © Skill.com | All Rights Reserved
      </h3>
    </footer>
  );
}
export default Footer;
