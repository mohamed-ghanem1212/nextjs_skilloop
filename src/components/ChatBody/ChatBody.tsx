"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import MessageBubble from "../message/Message";

import { Textarea } from "../ui/textarea";
import { Camera, GalleryHorizontal, SendHorizonalIcon } from "lucide-react";
import SideBarUsers from "../sideUsers/SideBarUsers";

import { MessageData } from "../../../.next/dev/types/message";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/lib/events/events";

function ChatBody({
  messages,
  socket,
  currentUserId,
  activeChatRoomId,
}: {
  messages: MessageData[];
  currentUserId: string;
  socket: Socket;
  activeChatRoomId: string;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [isSocketReady, setIsSocketReady] = useState(false);

  useEffect(() => {
    if (!socket) {
      setIsSocketReady(false);
      return;
    }

    const checkConnection = () => {
      setIsSocketReady(socket.connected);
      console.log("🔌 ChatBody socket status:", socket.connected);
    };

    checkConnection();

    socket.on("connect", checkConnection);
    socket.on("disconnect", checkConnection);

    return () => {
      socket.off("connect", checkConnection);
      socket.off("disconnect", checkConnection);
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !socket.connected) {
      console.log("❌ Socket not connected");
      return;
    }

    if (!activeChatRoomId) {
      console.log("❌ No active chat room");
      return;
    }

    if (!text.trim()) {
      console.log("❌ Empty message");
      return;
    }

    console.log("📤 Sending message:", {
      room: activeChatRoomId,
      text: text,
      sender: currentUserId,
    });

    // Emit message through socket
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, activeChatRoomId, text);

    // Clear input
    setText("");
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      sendMessage();
    }
  };

  const isInputDisabled = !socket || !isSocketReady || !activeChatRoomId;

  return (
    <div className="relative flex flex-col h-200 w-full">
      <div
        className="flex flex-col overflow-y-scroll px-5 py-7 space-y-7 chat-scroll w-full h-full justify-end"
        ref={bottomRef}
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            {!activeChatRoomId
              ? "Select a chat to start messaging"
              : !isSocketReady
                ? "Connecting to chat server..."
                : "No messages yet. Start the conversation!"}
          </div>
        ) : (
          messages.map((msg: MessageData) => (
            <MessageBubble
              key={msg._id}
              messages={msg}
              isMe={msg.senderId._id === currentUserId}
            />
          ))
        )}
        <div />
      </div>
      <SideBarUsers />

      <div className="h-20 w-full px-3 bg-gray-50 flex items-center gap-4">
        <div className="flex flex-row gap-3 text-blue-700 w-fit">
          <GalleryHorizontal className="cursor-pointer hover:text-black duration-200" />
          <Camera className="cursor-pointer hover:text-black duration-200" />
        </div>

        <div className="h-20 w-full px-3 bg-gray-50 flex items-center gap-4 justify-center">
          <Textarea
            value={text}
            placeholder={
              isInputDisabled
                ? "Select a chat to start messaging..."
                : "Type your message here..."
            }
            className="
              w-60
              sm:w-full
              resize-none
              overflow-y-auto
              h-12
              rounded-[250px]
              border
              border-gray-200
              bg-gray-50
              px-4
              py-3
              text-sm
              text-gray-800
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
              focus:border-transparent
              shadow-sm
              overflow-hidden
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isInputDisabled}
          />

          <div
            className={`
              p-3 rounded-full cursor-pointer duration-200
              ${
                !text.trim() || isInputDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-500"
              }
            `}
            onClick={sendMessage}
          >
            <SendHorizonalIcon className="text-white w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
