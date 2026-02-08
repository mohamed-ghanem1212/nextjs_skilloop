"use client";
import { ReactNode, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { createSkillOfferApi } from "@/lib/skillOffer.axios";
import React from "react";
import axios from "axios";
import { SkillOfferT } from "../../types.entities/skills.types";
import SkillOffer from "../SkillOffer/SkillOffer";
import { SECTION } from "@/types.entities/skillData.types";
import { SkeletonText } from "../skeletonText/SkeletonText";

function ShowSkillOffers({
  offerSection,
}: {
  offerSection: SECTION;
}): ReactNode {
  const [offers, setOffers] = React.useState<SkillOfferT[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await createSkillOfferApi.get(
          `/getSkillOffersBySection?section=${offerSection}`,
        );
        setLoading(true);
        setOffers(res.data.skillOffers);
        console.log(res.data.skillOffers);
        setLoading(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log("STATUS:", err.response?.status);
          console.log("DATA:", err.response?.data);
          console.log("HEADERS:", err.response?.headers);
          setLoading(false);
        } else {
          console.log("UNEXPECTED:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);
  return (
    <div className="flex justify-center w-full">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-330"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-7">
          {offers.length > 0 ? (
            offers
              .filter((offer) => offer.userId !== null)
              .map((offer) => (
                <CarouselItem
                  key={offer._id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <SkillOffer offer={offer} />
                </CarouselItem>
              ))
          ) : (
            <div className=" flex flex-row gap-7 h-full w-full text-center py-8 justify-center">
              <div className="flex justify-center">
                <SkeletonText />
              </div>
              <div className="hidden md:flex justify-center">
                <SkeletonText />
              </div>
              <div className="hidden lg:flex justify-center">
                <SkeletonText />
              </div>
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious className="xl:flex hidden" />
        <CarouselNext className="xl:flex hidden" />
      </Carousel>
    </div>
  );
}
export default ShowSkillOffers;
