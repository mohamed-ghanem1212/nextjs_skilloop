import Image from "next/image";
import { ReactNode } from "react";
import devImage from "../../../../public/images/development.jpg";
import SkillProvider from "@/components/skillProvider/SkillProvider";
import ShowProviders from "@/components/showProviders/ShowProviders";

import { use } from "react";
import { notFound } from "next/navigation";
import { skillConfig } from "../[skill]/data";

function SkillPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}): ReactNode {
  const { skill } = use(params);
  const skillInfo = skillConfig[skill];

  if (!skillInfo) notFound();

  const SkillComponent = skillInfo.component;
  return <SkillComponent />;
}

export default SkillPage;
