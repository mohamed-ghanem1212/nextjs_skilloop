"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../public/images/12085.jpg";
import CreateOffer from "@/components/createOffer/createOffer";
import CreateSkill from "@/components/createSkill/CreateSkill";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import ProposalContainer from "@/components/proposalContainer/ProposalContainer";

function Profile(): ReactNode {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center py-10">Loading profile...</div>;
  console.log(user?.email);

  if (!user) return <div className="text-center py-10">User not logged in</div>;

  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex flex-col p-20 w-full items-center justify-center gap-8">
        <div className="xl:w-100 xl:h-100 w-80 h-80 overflow-hidden rounded-full bg-border">
          <Image
            src={user?.profilePicture || profilePic}
            alt="Profile Picture"
            className="w-full h-full object-cover"
            width={320}
            height={320}
            loading="eager"
          />
        </div>
        <div className="flex flex-col w-150 gap-5 items-center">
          <h1 className="font-bold text-4xl xl:text-7xl text-center">
            {user?.username}
          </h1>
          <h4 className="xl:text-3xl text-xl mb-3">{user?.email}</h4>
          <p className="text-center xl:w-200 w-90">{user?.bio}</p>
        </div>
        <div className="flex flex-row gap-5">
          <CreateOffer title="create offer" />
          <ProposalContainer />
          <CreateSkill />
        </div>
      </div>
    </div>
  );
}

export default Profile;
