import { ReactNode, useEffect } from "react";
import Image from "next/image";
import ReadMoreText from "../ReadText/ReadText";
import { createSkillOfferApi } from "@/lib/skillOffer.axios";
import { SkillOfferT } from "../../types.entities/skills.types";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

function SkillOffer({ offer }: { offer: SkillOfferT }): ReactNode {
  if (!offer.userId) return null;
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full max-w-100 h-full p-3 border rounded-xl hover:shadow-lg duration-200 hover:bg-gray-200 cursor-pointer hover:scale-105 select-none">
      <div className="flex flex-col flex-1 w-full px-4 py-3">
        <h4 className="text-md font-bold line-clamp-2 mb-3">
          {offer.wantSkill}
        </h4>

        <div className="flex flex-col flex-1 justify-between w-full gap-3">
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

          <div className="flex flex-col gap-3 items-start">
            <div
              className={`${offer.status == "Open" ? "bg-green-400" : offer.status == "Matched" ? "bg-blue-400" : "bg-red-500"} w-fit px-2 py-1 rounded-md`}
            >
              <p className="text-white font-bold text-[10px]">{offer.status}</p>
            </div>
            <p
              className={`text-gray-600 text-[13px] ${!offer.description ? "line-clamp-1" : !offer.description.length ? "line-clamp-1" : "line-clamp-3"}`}
            >
              {offer.description}
            </p>
          </div>

          <div className="mt-auto">
            <ReadMoreText
              title="Register"
              text={offer.description}
              offerId={offer._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SkillOffer;
