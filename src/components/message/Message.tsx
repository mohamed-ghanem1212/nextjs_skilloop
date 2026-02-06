import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageData } from "../../../.next/dev/types/message";

function MessageBubble({
  messages,
  isMe,
}: {
  messages: MessageData;
  isMe: boolean;
}) {
  console.log(messages.senderId);

  return (
    <div
      className={`flex w-full px-2 sm:px-4 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-row items-end max-w-[85%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
        {!isMe && (
          <div className="shrink-0 mr-2">
            <Avatar className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
              <AvatarImage
                src={messages.senderId.profilePicture}
                alt=""
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="text-xs">
                {messages.senderId.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div
          className={`
            w-fit max-w-full rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm wrap-break-word
            ${
              isMe
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-200 text-gray-900 rounded-bl-none"
            }
          `}
        >
          {messages.text}
        </div>

        {isMe && (
          <div className="shrink-0 ml-2">
            <Avatar className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
              <AvatarImage
                src={messages.senderId.profilePicture}
                alt=""
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="text-xs">
                {messages.senderId.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
