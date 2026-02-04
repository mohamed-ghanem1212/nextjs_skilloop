import { ReactNode, useEffect } from "react";
import Image from "next/image";
import ReadMoreText from "../ReadText/ReadText";
import { createSkillOfferApi } from "@/lib/skillOffer.axios";
import { SkillOfferT } from "../../../.next/dev/types/skills.types";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

function SkillOffer({ offer }: { offer: SkillOfferT }): ReactNode {
  if (!offer.userId) return null;
  const { user } = useAuth();

  return (
    <div className=" flex flex-col items-center self-start p-3 border rounded-xl m-5 w-87 xl:w-100 hover:shadow-lg duration-200 hover:bg-gray-200 cursor-pointer hover:scale-105 select-none">
      <div className="flex flex-col h-full items-start w-full px-4 py-3 gap-3">
        <h4 className="text-md font-bold line-clamp-2">{offer.wantSkill}</h4>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row items-center">
            <Link
              className="text-[15px] font-medium hover:underline"
              href={
                user?._id !== offer.userId._id
                  ? `/profile/${offer.userId._id}`
                  : `/profile`
              }
            >
              {offer.userId.username ?? "Unknown User"}
            </Link>
            <span className="text-[20px] font-medium mx-2">|</span>
            <p className="text-sm font-medium"> ⭐ {offer.section}</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div
              className={`${offer.status == "Open" ? "bg-green-400" : offer.status == "Matched" ? "bg-blue-400" : "bg-red-500"} w-fit p-1 rounded-md my-1`}
            >
              <p className="text-white font-bold text-[10px]">{offer.status}</p>
            </div>
            <p
              className={`font-bold ${offer.level == "Advanced" ? "text-red-500" : offer.level == "Intermediate" ? "text-orange-500" : "text-green-500"}`}
            >
              {offer.level}
            </p>
          </div>
          <ReadMoreText
            title="Register"
            text={offer.description}
            offerId={offer._id}
          />
        </div>
      </div>
    </div>
  );
}
export default SkillOffer;
