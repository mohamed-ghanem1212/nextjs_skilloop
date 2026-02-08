"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../public/images/12085.jpg";
import CreateOffer from "@/components/createOffer/createOffer";
import CreateSkill from "@/components/createSkill/CreateSkill";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import ProposalContainer from "@/components/proposalContainer/ProposalContainer";
import UnAuthUser from "@/components/unauthUser/UnAuthUser";

function Profile(): ReactNode {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center py-10">Loading profile...</div>;

  if (!user) return <UnAuthUser />;

  return (
    <div className="flex flex-col bg-gray-200 w-full">
      <div className="flex flex-col p-6 sm:p-10 lg:p-20 w-full items-center justify-center gap-8">
        <div className="w-40 h-40 sm:w-60 sm:h-60 xl:w-100 xl:h-100 overflow-hidden rounded-full bg-border shrink-0">
          <Image
            src={user?.profilePicture || profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            width={320}
            height={320}
            loading="eager"
          />
        </div>
        <div className="flex flex-col w-full max-w-2xl gap-5 items-center px-4">
          <h1 className="font-bold text-3xl sm:text-4xl xl:text-7xl text-center">
            {user?.username}
          </h1>
          <h4 className="text-lg sm:text-xl xl:text-3xl mb-3 font-semibold text-center">
            {user?.title}
          </h4>
          <p className="text-center w-full max-w-3xl text-sm sm:text-base">
            {user?.bio}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto px-4 sm:px-0 items-center">
          <ProposalContainer />
          <CreateSkill />
          <CreateOffer title="create offer" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
