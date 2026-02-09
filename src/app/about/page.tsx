import { ReactNode } from "react";
import Image from "next/image";
import abt from "../../../public/images/18276.jpg";
function About(): ReactNode {
  return (
    <div className="flex lg:flex-row flex-col lg:px-30 px-16 py-20 justify-between items-center gap-12 lg:gap-40">
      <div className="flex flex-col items-center gap-24 lg:w-[60%] w-full h-full">
        <h1 className="md:text-7xl text-3xl font-bold">Our Journey so far</h1>
        <div className="h-full rounded-[40px] overflow-hidden">
          <Image src={abt} alt="" className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col lg:w-[55%] text-center lg:text-start">
        <p className="text-2xl text-center lg:text-start">
          We are a creative content and design agency dedicated to empowering
          startups and small businesses. Through compelling content and visually
          engaging design, we help brands stand out and transform ideas into
          impactful realities.
        </p>
        <p className="text-xl leading-32">
          Skilloop is powered by a network of
          <br /> <strong className="text-8xl">48+</strong>
        </p>
        <p className="text-xl leading-32">
          Our solutions help businesses achieve an average revenue growth of
          <br />
          <strong className="text-8xl">70%</strong>
        </p>
        <p className="text-xl leading-32">
          We’ve supported the market with <br />{" "}
          <strong className="text-8xl">78,958</strong>
        </p>
      </div>
    </div>
  );
}
export default About;
