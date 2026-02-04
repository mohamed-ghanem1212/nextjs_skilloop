import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageData } from "../../../.next/dev/types/message";

// export const message = [
//   {
//     id: "1",
//     text: "Hey 👋",
//     senderId: "1",
//     createdAt: "2026-01-06T12:00:00Z",
//   },
//   {
//     id: "2",
//     text: "Hi! How are you?",
//     senderId: "1",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "3",
//     text: "Hi! How are you?",
//     senderId: "3",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "7",
//     text: "Hey 👋",
//     senderId: "5",
//     createdAt: "2026-01-06T12:00:00Z",
//   },
//   {
//     id: "8",
//     text: "Hi! How are you?",
//     senderId: "8",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "9",
//     text: "Hi! How are you?",
//     senderId: "6",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "11",
//     text: "Hi! How are you?",
//     senderId: "11",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "12",
//     text: "Hi! How are you?",
//     senderId: "12",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "13",
//     text: "Hey",
//     senderId: "13",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "16",
//     text: "Hi! How are you?",
//     senderId: "12",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "17",
//     text: "Hi! How are you?",
//     senderId: "13",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "18",
//     text: "Hi! How are you?",
//     senderId: "12",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
//   {
//     id: "19",
//     text: "Hi! How are you?",
//     senderId: "13",
//     createdAt: "2026-01-06T12:01:00Z",
//   },
// ];

function MessageBubble({
  messages,
  isMe,
}: {
  messages: MessageData;
  isMe: boolean;
}) {
  console.log(messages.senderId);

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className="flex flex-row justify-between
      "
      >
        <div className="order-2 flex items-end">
          <Avatar>
            <div className="w-9">
              <AvatarImage
                src={messages.senderId.profilePicture}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </Avatar>
        </div>
        <div
          className={`
            w-fit rounded-2xl px-4 py-2 text-sm
            ${
              isMe
                ? "bg-blue-600 text-white rounded-br-none order-1 mr-2"
                : "bg-gray-200 text-gray-900 rounded-bl-none order-2 ml-2"
            }
            `}
        >
          {messages.text}
        </div>
      </div>
    </div>
  );
}
export default MessageBubble;
