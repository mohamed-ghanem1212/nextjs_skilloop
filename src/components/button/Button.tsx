import { ReactNode } from "react";
type ButtonProps = {
  name: string;
  bgColor?: string;
  textColor?: string;
};

function Button({
  name,
  textColor = "text-white",
  bgColor = "bg-black",
}: ButtonProps): ReactNode {
  return (
    <button
      className={`${bgColor} ${textColor} md:w-56 w-28 h-13 rounded-[10px] mr-0 md:mr-3 cursor-pointer hover:bg-gray-400 duration-200`}
    >
      {name}
    </button>
  );
}
export default Button;
