import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profilePic from "../../../public/images/13450332_OrgCoral_Ofc-02_Concept-04.jpg";
import Image from "next/image";
import { Menu } from "lucide-react";
type profile = {
  name: string;
  title: string;
  width: string;
  nameSize: string;
  textSize: string;
  textColor: string;
  profilePicture?: string;
};
function ChatProfile({
  name,
  title,
  width,
  nameSize,
  textSize,
  textColor,
  profilePicture,
}: profile): ReactNode {
  return (
    <div className="flex flex-row justify-center items-center xl:gap-4 gap-2">
      <div className="flex flex-row gap-3 cursor-pointer hover:bg-gray-200 rounded-3xl p-1 duration-150">
        <Avatar>
          <AvatarImage
            src={
              profilePicture ??
              "https://testingbot.com/free-online-tools/random-avatar/200"
            }
            alt=""
            className={`${width} object-cover`}
          />
          <AvatarFallback>
            <Image src={profilePic} alt="" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col  justify-center">
          <h1 className={`font-bold ${textColor} ${nameSize}`}>{name}</h1>
          <p className={`text-gray-500 ${textSize}`}>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatProfile;
