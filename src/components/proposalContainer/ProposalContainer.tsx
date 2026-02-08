"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skill } from "../../types.entities/skillData.types";
import Proposal_Details from "../proposal/Proposal_Details";
import { createOfferRegisterApi } from "@/lib/register.axios";
import axios from "axios";
import { toast } from "sonner";
import { Registeration } from "../../types.entities/offerRegister.types";
function CreateSkill() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Dialog */}
      <div className="hidden md:block">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-800 text-white cursor-pointer hover:bg-gray-400 duration-150">
              View Proposals
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Received Proposals</DialogTitle>
              <DialogDescription>
                Browse proposals sent by providers for your skill offer and
                select the right partner to move forward.
              </DialogDescription>
            </DialogHeader>
            <ProposalContainer
              closeForm={() => {
                setDialogOpen(false);
                setDrawerOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Drawer */}
      <div className="block md:hidden chat-scroll">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-gray-800 text-white cursor-pointer hover:bg-gray-400 hover:text-white duration-150">
              View Proposals
            </Button>
          </DrawerTrigger>
          <DrawerContent className="chat-scroll overflow-hidden p-10">
            <DrawerHeader>
              <DrawerTitle>Received Proposals</DrawerTitle>
              <DrawerDescription>
                Browse proposals sent by providers for your skill offer and
                select the right partner to move forward.
              </DrawerDescription>
            </DrawerHeader>
            <ProposalContainer
              closeForm={() => {
                setDialogOpen(false);
                setDrawerOpen(false);
              }}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default CreateSkill;
type OfferFormProps = React.ComponentProps<"form"> & {
  closeForm: () => void;
};
function ProposalContainer({ className, closeForm }: OfferFormProps) {
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [proposals, setPropsals] = React.useState<Registeration[]>([]);
  React.useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const res = await createOfferRegisterApi.get(
          "/getAllUserOfferRegistes",
        );
        setPropsals(res.data.getAllUsersProposals);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log("STATUS:", err.response?.status);
          console.log("DATA:", err.response?.data);
          toast.success(err.response?.data.message);

          console.log("HEADERS:", err.response?.headers);
          setLoading(false);
        } else {
          console.log("UNEXPECTED:", err);
          toast.error("Something went wrong please try again later");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);
  const people = [
    {
      username: "shadcn5",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "shadcn3",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "shadcn1",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "maxleiter",
      avatar: "https://github.com/maxleiter.png",
      email: "maxleiter@vercel.com",
    },
    {
      username: "evilrabbit2",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@vercel.com",
    },
  ];
  return (
    <ItemGroup className="w-full flex flex-col gap-4 overflow-y-scroll h-100 chat-scroll">
      {proposals &&
        proposals.map((propsal, index) => (
          <Item key={propsal._id} variant="outline">
            <ItemMedia>
              <Avatar className="w-15">
                <AvatarImage
                  src={propsal.providerId!.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback>
                  {propsal.providerId?.username!.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-1">
              <ItemTitle>{propsal.providerId?.username}</ItemTitle>
              <ItemDescription>{propsal.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Proposal_Details
                _id={propsal._id!}
                wantSkill={propsal.offerId?.wantSkill!}
                username={propsal.providerId?.username!}
                description={propsal.description}
                profilePicture={propsal.providerId?.profilePicture!}
                title={propsal.providerId?.title!}
              />
            </ItemActions>
          </Item>
        ))}
    </ItemGroup>
  );
}
