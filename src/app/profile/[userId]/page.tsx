"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../../public/images/userDefault.svg";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { createUserApi } from "@/lib/user.axios";
import { User } from "../../../types.entities/user.types";
import { toast } from "sonner";

function Profile(): ReactNode {
  const { user } = useAuth();
  const [loading, setLoading] = useState<Boolean>(false);
  const params = useParams();
  const userId = params.userId;
  const [vUser, setVUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await createUserApi.get(`/getUser/${userId}`);
        setVUser(res.data.user);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("STATUS:", err.response?.status);
          console.log("DATA:", err.response?.data);
          toast.error(err.response?.data.message);
          console.log("HEADERS:", err.response?.headers);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-200 w-full h-full">
      <div className="flex flex-col p-6 sm:p-10 lg:p-20 w-full items-center justify-center gap-8">
        <div className="w-40 h-40 sm:w-60 sm:h-60 xl:w-100 xl:h-100 overflow-hidden rounded-full bg-border shrink-0">
          <Image
            src={vUser?.profilePicture || profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            width={320}
            height={320}
            loading="eager"
          />
        </div>
        <div className="flex flex-col w-full max-w-2xl gap-5 items-center px-4">
          <h1 className="font-bold text-3xl sm:text-4xl xl:text-7xl text-center">
            {vUser?.username}
          </h1>
          <h4 className="text-lg sm:text-xl xl:text-3xl mb-3 font-semibold text-center">
            {vUser?.title}
          </h4>
          <p className="text-center w-full max-w-3xl text-sm sm:text-base">
            {vUser?.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
