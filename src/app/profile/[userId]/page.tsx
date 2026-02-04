"use client";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../../public/images/userDefault.svg";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { createUserApi } from "@/lib/user.axios";
import { User } from "../../../../.next/dev/types/user.types";
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
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("STATUS:", err.response?.status);
          console.log("DATA:", err.response?.data);
          toast.error(err.response?.data.message);
          console.log("HEADERS:", err.response?.headers);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex flex-col p-20 w-full items-center justify-center gap-8">
        <div className="xl:w-100 xl:h-100 w-80 h-80 overflow-hidden rounded-full bg-border">
          <Image
            src={vUser?.profilePicture || profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            width={320}
            height={320}
            loading="eager"
          />
        </div>
        <div className="flex flex-col w-150 gap-5 items-center">
          <h1 className="font-bold text-4xl xl:text-7xl text-center">
            {vUser?.username}
          </h1>
          <h4 className="xl:text-3xl text-xl mb-3">{vUser?.email}</h4>
          <p className="text-center xl:w-200 w-90">{vUser?.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
