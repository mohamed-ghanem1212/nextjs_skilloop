import { ReactNode, useEffect } from "react";
import ChatProfile from "../chatProfile/ChatProfile";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import React from "react";
import { createChatRoomApi } from "@/lib/chatRoom.axios";
import axios from "axios";
import { toast } from "sonner";
import { User } from "../../../.next/dev/types/user.types";
import { useRouter } from "next/navigation";
import { ChatRoom } from "../../../.next/dev/types/chatRoom.types";
type CloseButtonProps = {
  onClose: () => void;
  providers: never[];
  onSelectChat: (
    chatRoomId: string,
    user: {
      _id: string;
      profilePicture: string;
      username: string;
      title: string;
    },
  ) => void;
};
export type Chat = {
  chatRoomId: string;
  user: {
    _id: string;
    profilePicture: string;
    username: string;
    title: string;
  };
};
function ChatUsers({
  onClose,
  onSelectChat,
  providers,
}: CloseButtonProps): ReactNode {
  return (
    <div className="flex flex-col gap-5 w-full h-185 chat-scroll">
      <div className="mt-6 w-full gap-5 px-3 flex flex-col">
        <div className="w-full relative flex flex-row items-center gap-4">
          <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            type="text"
            className="px-10 h-13 text-lg rounded-4xl"
          />
          <div
            className="hover:bg-gray-300 p-2 rounded-full duration-200 cursor-pointer block md:hidden"
            onClick={onClose}
          >
            <X />
          </div>
        </div>
        <h1 className="font-bold text-xl ">Messages</h1>
      </div>
      <div className="flex flex-col w-full overflow-y-auto items-start px-5 gap-5 h-170">
        {providers ? (
          providers.map((chat: Chat) => (
            <div
              key={chat.user._id}
              onClick={() => onSelectChat(chat.chatRoomId, chat.user)}
              className="w-full cursor-pointer flex flex-row items-start"
            >
              <ChatProfile
                profilePicture={chat.user.profilePicture}
                name={chat.user.username}
                title={chat.user.title}
                nameSize="text-md"
                textSize="text-[0.8rem]"
                width="w-12"
                textColor="black"
              />
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
export default ChatUsers;
