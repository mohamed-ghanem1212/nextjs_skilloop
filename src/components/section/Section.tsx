import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import marketing from "../../../public/images/ChatGPT Image Jan 2, 2026, 05_03_59 PM.png";
import business from "../../../public/images/freepik__background__97304.png";
import other from "../../../public/images/freepik__background__89228.png";
import dev from "../../../public/images/cross-platform-frameworks-abstract-concept-illustration.png";
import art from "../../../public/images/painting-abstract-concept-illustration-amateur-painter-home-course-learn-about-drawing-boost-your-creativity-art-therapy-exercises-online-sketching-lesson-kids.png";
type section = {
  img: StaticImageData;
  title: string;
  description: string;
  order?: string;
  path: string;
};
export type skillType = {
  slug: string;
  title: string;
  img: StaticImageData;
  description: string;
  order?: string;
};
export const skills: skillType[] = [
  {
    slug: "development",
    title: "Build, Scale, and Master Development",
    img: dev,
    description:
      "Discover a diverse collection of development paths taught by top-rated providers on Skilloop. Whether you’re starting your journey or advancing your expertise, you’ll find high-quality offerings covering multiple technologies, frameworks, and real-world solutions built to match different skill levels.",
    order: "lg:order-1",
  },
  {
    slug: "design",
    title: "Unleash Creativity Across Art Disciplines",
    img: art,
    description:
      "Explore a vibrant space dedicated to artistic and creative skills, featuring a wide range of tracks such as illustration, digital art, branding, content creation, and more. Connect with talented creators and experienced providers who share practical techniques, creative workflows, and real-world insights to help you express ideas and turn creativity into value.",
  },
  {
    slug: "marketing",
    title: "Grow Through Smart Marketing Strategies",
    img: marketing,
    description:
      "This section gathers diverse marketing skills including digital marketing, social media, content strategy, performance ads, and brand growth. Learn from skilled providers who offer proven approaches, hands-on experience, and up-to-date strategies designed to help you reach audiences, build visibility, and achieve measurable results.",
    order: "lg:order-1",
  },
  {
    slug: "business",
    title: "Build Strong Business Foundations",
    img: business,
    description:
      "Discover essential business skills covering entrepreneurship, management, sales, finance, and operations. This section connects you with knowledgeable providers who focus on practical decision-making, real market experience, and strategic thinking to help you start, manage, and scale successful business ventures.",
  },
  {
    slug: "other",
    title: "Discover Skills Beyond Categories",
    img: other,
    description:
      "Explore a diverse collection of skills that go beyond traditional categories, ranging from productivity and communication to emerging and specialized fields. This space is designed to help you discover unique offerings from expert providers and expand your knowledge in areas that support personal growth and professional development.",
    order: "lg:order-1",
  },
];

function Section({
  img,
  title,
  description,
  order = "lg:order-2",
  path,
}: section): ReactNode {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between md:px-20 mt-20 md:mt-0">
      <div className="flex flex-col w-[60%] lg:w-[40%] gap-10 text-center lg:text-start order-2 items-center lg:items-start">
        <h2 className="text-blue-700 md:text-4xl text-3xl font-bold">
          {title}
        </h2>
        <p className="text-black text-xl">{description}</p>
        <Link href={path}>
          <Button name="explore" />
        </Link>
      </div>
      <div className={`${order}`}>
        <Image src={img} width={700} height={700} alt="" />
      </div>
    </div>
  );
}
export default Section;
