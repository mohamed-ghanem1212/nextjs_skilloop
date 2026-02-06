import { ReactNode } from "react";
import Image from "next/image";
import com from "../../../public/images/12085.jpg";
import share from "../../../public/images/20822846_NA_October_10.svg";
import pic1 from "../../../public/images/25.jpg";
import pic2 from "../../../public/images/629.jpg";
import pic3 from "../../../public/images/5360.jpg";
import pic4 from "../../../public/images/2148514859.jpg";
import Button from "@/components/button/Button";
import Icon from "@/components/icon";
import bg from "../../../public/images/9963615.jpg";
import { LanguageSkillIcon, Link06Icon, TradeUpIcon } from "hugeicons-react";
import Card from "@/components/card";
import Link from "next/link";

function page(): ReactNode {
  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-5 md:gap-0 justify-between p-7 xl:p-20 w-full items-center">
        <div className="hidden xl:block ">
          <Image
            src={share}
            alt=""
            className="object-cover select-none"
            width={700}
            height={700}
          />
        </div>
        <div className="xl:w-[50%] text-center xl:text-start flex flex-col justify-center items-center xl:items-start">
          <h1 className="xl:text-4xl text-center xl:text-start text-3xl text-blue-700 font-bold mb-6">
            Empower Others by Sharing Your Skills
          </h1>
          <div className="xl:hidden mb-5 overflow-hidden">
            <Image
              src={share}
              alt=""
              className="object-cover select-none"
              width={400}
              height={400}
            />
          </div>
          <p className="text-xl xl:text-[68px] font-bold leading-tight text-center lg:text-start">
            Offer your skills, create learning experiences, and reach people who
            need them.
          </p>
          <div className="flex flex-col xl:flex-row gap-7 mt-14 items-center">
            <Link href="/discover">
              <Button name="Explore" />
            </Link>
            <p className="text-gray-600 text-center xl:text-start text-[15px] md:text-[18px]">
              Publish your services and skills in design, development,
              marketing, and more.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-12 px-10 xl:px-28 mb-20">
        <Icon
          icon={LanguageSkillIcon}
          description="Create offers, share your expertise, and teach others through structured learning or services."
        />
        <Icon
          icon={Link06Icon}
          description="Connect with learners who are actively searching for your skills."
        />
        <Icon
          icon={TradeUpIcon}
          description="Grow your audience, gain trust, and scale your impact through reviews and visibility."
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-5 lg:gap-0 lg:justify-between p-10 xl:p-20 w-full bg-gray-200 items-center">
        <div className="flex flex-col xl:items-start items-center xl:w-[50%] text-center lg:text-start">
          <h1 className="xl:text-4xl text-2xl text-blue-700 font-bold mb-6">
            Turn Skills Into Real Opportunities
          </h1>
          <div className="xl:hidden mb-5 overflow-hidden">
            <Image
              src={com}
              alt=""
              className="object-cover select-none"
              width={400}
              height={400}
            />
          </div>
          <p className="text-2xl xl:text-[68px] font-bold  leading-tight">
            Discover services, offers, and talents in one place.
          </p>
          <div className="flex flex-col xl:flex-row gap-7 mt-14 items-center">
            <Link href="/discover">
              <Button name="Discover" />
            </Link>
            <p className="text-gray-600 text-center xl:text-start text-[15px] xl:text-[18px]">
              Search for design, development, marketing…
            </p>
          </div>
        </div>
        <div className="hidden xl:block ">
          <Image
            src={com}
            alt=""
            className="object-cover select-none"
            width={700}
            height={700}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 my-28 xl:px-0">
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          See What Our Community Says About Skilloop
        </h1>
        <p className="md:text-2xl text-center">
          Hear from skill providers and learners who’ve already shared, learned,
          and grown with us.
        </p>
        <div className="flex flex-col my-10 mx-10">
          <div className="flex flex-col xl:flex-row">
            <Card
              description="The Skilloop team has been a pleasure to work with. Their platform made it easy to share my skills, connect with learners, and adapt my offers as my audience grew."
              img={pic1}
              name="Daniel Brooks, Creative Hub Studio"
            />
            <Card
              description="Skilloop gave me a simple way to turn my experience into real learning opportunities. I was able to reach people who genuinely wanted to learn and grow.
"
              img={pic2}
              name="Ryan Roberts, The Growth Collective"
            />
          </div>
          <div className="flex flex-col xl:flex-row">
            <Card
              description="Finding the right skills and mentors on Skilloop was effortless. The platform helped me connect with experienced providers and learn exactly what I needed.
"
              img={pic3}
              name="Micheal Mitchell, Nova Learning Space"
            />
            <Card
              description="Thanks to Skilloop, I expanded my reach and built trust with learners faster than I expected. Everything I needed to manage my offers was in one place.
"
              img={pic4}
              name="Omar Khaled, Impact Skills Network"
            />
          </div>
        </div>
        <div className="bg-linear-to-r from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90% xl:p-24 p-9 w-full">
          <div className="bg-black rounded-4xl p-8 md:p-12 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-5 py-6 px-1">
              <h2 className=" text-white text-2xl text-center lg:text-start md:text-4xl font-bold ">
                Deliver impactful learning and skill experiences.
              </h2>
              <p className="text-gray-200 text-sm text-center lg:text-start">
                We help individuals and teams share knowledge and grow together.
              </p>
            </div>
            <Link href="/contact">
              <Button
                name="Contact Us"
                bgColor="bg-white"
                textColor="text-black"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
