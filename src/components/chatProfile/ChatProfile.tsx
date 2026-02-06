import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "../../../public/images/13450332_OrgCoral_Ofc-02_Concept-04.jpg";
import Image from "next/image";

type profile = {
  name: string;
  title: string;
  width?: string;
  nameSize?: string;
  textSize?: string;
  textColor?: string;
  profilePicture?: string;
};

function ChatProfile({
  name,
  title,
  width = "w-12 h-12",
  nameSize = "text-base",
  textSize = "text-sm",
  textColor = "text-gray-900",
  profilePicture,
}: profile): ReactNode {
  return (
    <div className="flex flex-row justify-center items-center gap-2 xl:gap-4 min-w-0">
      <div className="flex flex-row gap-2 xl:gap-3 cursor-pointer hover:bg-gray-200 rounded-3xl p-1 duration-150 min-w-0">
        <Avatar className={`${width} shrink-0`}>
          <AvatarImage
            src={
              profilePicture ||
              "https://testingbot.com/free-online-tools/random-avatar/200"
            }
            alt={name}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full">
            <Image
              src={profilePic}
              alt={name}
              className="w-full h-full object-cover"
            />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center min-w-0 overflow-hidden">
          <h1 className={`font-bold ${textColor} ${nameSize} truncate`}>
            {name}
          </h1>
          <p className={`text-gray-500 ${textSize} truncate`}>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatProfile;
