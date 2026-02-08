"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import devImage from "../../../public/images/download (8).jpg";
import ReadMoreText from "../ReadText/ReadText";

import axios from "axios";
import { Skill } from "../../types.entities/skillData.types";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { createChatRoomApi } from "@/lib/chatRoom.axios";
import { toast } from "sonner";
import { ChatRoom } from "../../types.entities/chatRoom.types";
import { useRouter } from "next/navigation";

function SkillProvider({ skill }: { skill: Skill }): ReactNode {
  if (!skill.userId) return null;
  const { user } = useAuth();
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState<ChatRoom>({
    participants: [user?._id!, skill.userId._id],
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const handleCreateChatRoom = async () => {
    try {
      const res = await createChatRoomApi.post("/createChatRoom", {
        providerId: skill.userId._id,
      });
      setChatRoom(res.data.createRoom);
      toast.success(res.data.message);
      router.push("/chat");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.error(
          err.response?.data.message ||
            "Something went wrong please try again later",
        );
        console.log(chatRoom);

        console.log("HEADERS:", err.response?.headers);
      } else {
        console.log("UNEXPECTED:", err);
        toast.error("Something went wrong please try again later");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-100 h-full p-3 border rounded-xl hover:shadow-lg duration-200 hover:bg-gray-200 cursor-pointer hover:scale-105 select-none">
      <div className="w-full overflow-hidden rounded-xl h-60 shrink-0 mb-5">
        <Image
          width={500}
          height={500}
          src={(skill.image as string) ?? devImage}
          alt="Skill Provider"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="flex flex-col flex-1 w-full px-4 h-full">
        <h4 className="text-sm font-bold line-clamp-2 mb-3">{skill.skill}</h4>

        <div className="flex flex-col flex-1 items-start w-full justify-between">
          <div className="flex flex-col h-full">
            <div className="flex flex-row w-full items-center mb-3">
              <p className="text-[10px] font-medium">
                by:{" "}
                <Link
                  className="hover:underline"
                  href={
                    user?._id !== skill.userId._id
                      ? `/profile/${skill.userId._id}`
                      : `/profile`
                  }
                >
                  <strong className="text-[12px] hover:underline">
                    {skill.userId.username}
                  </strong>
                </Link>
              </p>
              <span className="text-[10px] font-medium mx-2">|</span>
              <p className="text-[10px] font-medium">4.8 ⭐ (1.2k Reviews)</p>
            </div>
            <p
              className={`text-gray-600 text-[13px] ${!skill.description ? "line-clamp-1" : !skill.description.length ? "line-clamp-1" : "line-clamp-3"}`}
            >
              {skill.description}
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between w-full">
            <ReadMoreText
              title="Contact"
              text={skill.description}
              onClick={handleCreateChatRoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SkillProvider;
