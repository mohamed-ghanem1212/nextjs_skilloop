import { HugeiconsProps, LanguageSkillIcon } from "hugeicons-react";
import { FC, ReactNode, RefAttributes } from "react";
type Icon = {
  description: string;
  icon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>;
};
function Icon({ icon: IconComponent, description }: Icon): ReactNode {
  return (
    <div className="flex flex-row gap-5 items-center">
      <div>
        <IconComponent className="bg-black text-white md:w-23 md:h-23 w-14 h-14 text-4xl p-3 rounded-full" />
      </div>

      <p className="xl:text-[14px] text-[13px]">{description}</p>
    </div>
  );
}
export default Icon;
