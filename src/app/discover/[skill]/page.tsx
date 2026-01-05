import Image from "next/image";
import { ReactNode } from "react";
import devImage from "../../../../public/images/development.jpg";
import SkillProvider from "@/components/skillProvider/SkillProvider";
import ShowProviders from "@/components/showProviders/ShowProviders";
type Props = {
  params: {
    skill: string;
  };
};
import { notFound } from "next/navigation";
import { skillConfig } from "../[skill]/data";

function SkillPage({ params }: { params: { skill: string } }) {
  const skill = skillConfig[params.skill];

  if (!skill) notFound();

  const SkillComponent = skill.component;

  return <SkillComponent />;
}

export default SkillPage;
