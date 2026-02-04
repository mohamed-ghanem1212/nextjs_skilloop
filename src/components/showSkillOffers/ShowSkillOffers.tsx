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
import { SkillOfferT } from "../../../.next/dev/types/skills.types";
import SkillOffer from "../SkillOffer/SkillOffer";

function ShowSkillOffers(): ReactNode {
  const [offers, setOffers] = React.useState<SkillOfferT[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await createSkillOfferApi.get("/getAllSkillOffers");
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
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-80 md:w-225 xl:w-360 "
    >
      <CarouselContent>
        {offers.length > 0 ? (
          offers
            .filter((offer) => offer.userId !== null)
            .map((offer: SkillOfferT) => (
              <CarouselItem
                key={offer._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex items-center justify-center w-full">
                  <SkillOffer offer={offer} />
                </div>
              </CarouselItem>
            ))
        ) : (
          <div className="h-full w-full text-center">
            <p>No Offers shown</p>{" "}
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export default ShowSkillOffers;
