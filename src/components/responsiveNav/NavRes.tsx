"use client";

import { useAuth } from "@/context/authContext";
import { createUserApi } from "@/lib/user.axios";
import axios from "axios";
import { X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

type NavResProps = {
  isOpen: boolean;
  setIsOpened: (open: boolean) => void;
};
function NavRes({ isOpen, setIsOpened }: NavResProps): ReactNode {
  const { user, setUser } = useAuth();
  const handleLogOutUser = async () => {
    try {
      if (!user) {
        return;
      }
      const res = await createUserApi.post("/logOut");
      console.log(res.data);

      setUser(null);
      toast.success(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);
        toast.error(
          err.response?.data.message ||
            "Failed to log out, please try again later",
        );
      } else {
        console.log("UNEXPECTED:", err);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "opacity-95" : "opacity-0 hidden"
      } bg-gray-500  z-10`}
    >
      <div
        className="absolute top-10 right-10 cursor-pointer hover:bg-gray-600 rounded-full p-2 duration-150"
        onClick={() => setIsOpened(false)}
      >
        <X />
      </div>
      <div className="flex flex-col gap-15 text-xl text-center items-center py-30 font-bold">
        <Link
          href={"/home"}
          className="hover:text-blue-700 duration-200 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          Home
        </Link>
        <Link
          href={"/discover"}
          className="hover:text-blue-700 duration-200 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          Discover
        </Link>
        <Link
          href={"/about"}
          className="hover:text-blue-700 duration-200 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          About Us
        </Link>
        <Link
          href={"/contact"}
          className="hover:text-blue-700 duration-200 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          Contact
        </Link>
        <Link
          href={"/profile"}
          className={`hover:text-blue-700 duration-200 cursor-pointer ${user ? "" : "hidden"}`}
          onClick={() => setIsOpened(false)}
        >
          User Profile
        </Link>
        <Link
          href={"/chat"}
          className={`hover:text-blue-700 duration-200 cursor-pointer ${user ? "" : "hidden"}`}
          onClick={() => setIsOpened(false)}
        >
          Chat Room
        </Link>
        <Link
          onClick={handleLogOutUser}
          href={"/auth"}
          className={`hover:text-blue-700 duration-200`}
        >
          {user ? "Log out" : "Register"}
        </Link>
      </div>
    </div>
  );
}
export default NavRes;
