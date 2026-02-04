"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import ChatBody from "@/components/ChatBody/ChatBody";
import ChatProfile from "@/components/chatProfile/ChatProfile";
import {
  FavouriteIcon,
  Notification01Icon,
  Search01Icon,
} from "hugeicons-react";
import ChatUsers from "@/components/ChatUsers/ChatUsers";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { connectSocket, disconnectSocket } from "@/lib/socket.io";
import { SOCKET_EVENTS } from "@/lib/events/events";
import { MessageData } from "../../../.next/dev/types/message";
import { useAuth } from "@/context/authContext";
import { Socket } from "socket.io-client";
import { toast } from "sonner";
import axios from "axios";
import { createChatRoomApi } from "@/lib/chatRoom.axios";
import { createMessageApi } from "@/lib/message.axios";

function ChatRoom(): ReactNode {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [providers, setProviders] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState<{
    _id: string;
    profilePicture: string;
    username: string;
    title: string;
  } | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Keep track of the user ID to detect user changes
  const previousUserIdRef = useRef<string | null>(null);

  // Effect 1: Socket initialization and user change detection
  useEffect(() => {
    if (!user?._id) {
      console.log("⚠️ No user logged in, skipping socket initialization");
      // Disconnect socket if user logs out
      if (previousUserIdRef.current) {
        console.log("🔌 User logged out, disconnecting socket");
        disconnectSocket();
        setSocket(null);
        setIsSocketConnected(false);
        setMessages([]);
        setActiveChat(null);
        setActiveChatUser(null);
      }
      previousUserIdRef.current = null;
      return;
    }

    // Detect user change (logout/login with different user)
    if (previousUserIdRef.current && previousUserIdRef.current !== user._id) {
      console.log(
        "🔄 User changed from",
        previousUserIdRef.current,
        "to",
        user._id,
      );
      console.log("🔌 Disconnecting old socket for user change...");

      // Fully disconnect the old socket
      disconnectSocket();

      // Small delay to ensure cleanup completes
      setTimeout(() => {
        console.log("✨ Creating new socket for new user...");
        initializeSocket();
      }, 100);

      // Clear user-specific state
      setSocket(null);
      setIsSocketConnected(false);
      setMessages([]);
      setActiveChat(null);
      setActiveChatUser(null);

      // Update ref
      previousUserIdRef.current = user._id;
      return;
    }

    // First login or same user
    if (!previousUserIdRef.current) {
      console.log("🚀 First login, initializing socket for user:", user._id);
      initializeSocket();
    }

    // Update the previous user ID
    previousUserIdRef.current = user._id;

    function initializeSocket() {
      console.log("🚀 Initializing socket connection for user:", user?._id);

      // Pass user ID to connectSocket to track user changes
      const socketConnection = connectSocket(user?._id);

      // Set socket immediately
      setSocket(socketConnection);
      console.log("✅ Socket instance created");
      console.log("🔌 Initial socket.connected:", socketConnection.connected);

      if (socketConnection.connected) {
        console.log("✅ Socket already connected!");
        setIsSocketConnected(true);
      }

      const handleConnect = () => {
        console.log("✅ Socket connected for user:", user?._id);
        setIsSocketConnected(true);
      };

      const handleDisconnect = () => {
        console.log("🔌 Socket disconnected");
        setIsSocketConnected(false);
      };

      const handleConnectError = (error: Error) => {
        console.error("❌ Socket connection error:", error);
        setIsSocketConnected(false);
        toast.error("Failed to connect to chat server");
      };

      socketConnection.on("connect", handleConnect);
      socketConnection.on("disconnect", handleDisconnect);
      socketConnection.on("connect_error", handleConnectError);

      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await createChatRoomApi.get("/getUsersList");
          setProviders(res.data.findUsers);
          console.log("✅ Users loaded:", res.data.findUsers.length);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data.message || "Failed to load users");
          } else {
            toast.error("Something went wrong");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();

      return () => {
        console.log("🧹 Cleaning up socket listeners...");
        socketConnection.off("connect", handleConnect);
        socketConnection.off("disconnect", handleDisconnect);
        socketConnection.off("connect_error", handleConnectError);
        console.log("✅ Cleanup complete - socket remains connected");
      };
    }

    const cleanup = initializeSocket();
    return cleanup;
  }, [user?._id]); // Re-run when user ID changes

  // Effect 2: Active chat management
  useEffect(() => {
    if (!socket || !activeChat) {
      console.log("⚠️ Socket or activeChat not ready:", {
        hasSocket: !!socket,
        isConnected: isSocketConnected,
        activeChat,
      });
      return;
    }

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, activeChat);
    console.log("📤 Emitted JOIN_ROOM for:", activeChat);

    const fetchMessages = async () => {
      try {
        console.log("📥 Fetching messages for room:", activeChat);
        const response = await createMessageApi.get(
          `/getMessagesByChatRoom/${activeChat}`,
        );

        setMessages(response.data.messages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Response:", error.response?.data);
        }
        setMessages([]);
      }
    };

    fetchMessages();

    const handleNewMessage = (msg: MessageData) => {
      setMessages((prev) => {
        console.log("Previous messages count:", prev.length);
        const updated = [...prev, msg];
        console.log("Updated messages count:", updated.length);
        return updated;
      });
    };

    const handleError = (error: { message: string }) => {
      console.error("❌ Socket error event:", error);
      toast.error(error.message);
    };

    console.log("🎧 Adding listeners for:", SOCKET_EVENTS.NEW_MESSAGE);
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
    socket.on(SOCKET_EVENTS.ERROR, handleError);

    return () => {
      console.log("🔇 Removing listeners for room:", activeChat);
      socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
      socket.off(SOCKET_EVENTS.ERROR, handleError);
    };
  }, [socket, activeChat, isSocketConnected]);

  // Effect 3: Click outside handler
  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleSelectChat = (
    chatRoomId: string,
    user: typeof activeChatUser,
  ) => {
    console.log("🎯 Selecting chat:", chatRoomId);
    console.log(`Chatter User:${user?.username}`);

    setActiveChat(chatRoomId);
    setActiveChatUser(user);
    setMessages([]);
    if (isMobile) setIsOpen(false);
  };

  return (
    <div className="bg-gray-50">
      <div className="flex flex-row justify-between relative">
        {isOpen && isMobile && (
          <div
            ref={sidebarRef}
            className="left-1/2 top-2 -translate-x-1/2 md:block absolute z-20 bg-white shadow-2xl rounded-4xl w-[90%] xl:w-[30%]"
          >
            <ChatUsers
              providers={providers}
              onClose={() => setIsOpen(false)}
              onSelectChat={handleSelectChat}
            />
          </div>
        )}

        {!isOpen && !isMobile && (
          <div className="hidden md:block lg:w-[30%] w-[50%]">
            <ChatUsers
              providers={providers}
              onClose={() => setIsOpen(false)}
              onSelectChat={handleSelectChat}
            />
          </div>
        )}

        <div className="md:w-[60%] w-full bg-gray-50 items-center flex flex-col">
          <div
            className={`shadow-xl w-full rounded-b-4xl ${activeChat ? "block" : "hidden"}`}
          >
            <div className="flex flex-row items-center justify-between w-full p-2">
              <div className="flex flex-row items-center">
                <Menu
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer hover:bg-gray-300 rounded-full p-2 ml-2 w-9 h-9 md:hidden"
                />
                <ChatProfile
                  name={activeChatUser?.username!}
                  title={activeChatUser?.title!}
                  profilePicture={activeChatUser?.profilePicture}
                  width="xl:w-14 w-12"
                  nameSize="xl:text-lg text-[12px]"
                  textSize="xl:text-[1rem] text-[9px]"
                  textColor="text-blue-900"
                />
              </div>
              <div className="flex flex-row xl:gap-2 gap-1 text-gray-700 items-center">
                <Search01Icon className="cursor-pointer p-2 hover:bg-gray-300 xl:w-10 xl:h-10 w-8 h-8 rounded-full duration-200" />
                <FavouriteIcon className="cursor-pointer p-2 hover:bg-gray-300 xl:w-10 xl:h-10 w-8 h-8 rounded-full duration-200" />
                <Notification01Icon className="cursor-pointer p-2 hover:bg-gray-300 xl:w-10 xl:h-10 w-8 h-8 duration-200 rounded-full" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <ChatBody
              activeChatRoomId={activeChat!}
              currentUserId={user?._id!}
              messages={messages}
              socket={socket!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
