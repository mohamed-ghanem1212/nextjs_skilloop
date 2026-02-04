"use client";
import { ReactNode } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lvl, sections, SelectSection } from "../selection/Selection";
import { createSkillOfferApi } from "@/lib/skillOffer.axios";
import axios from "axios";
import { Registeration } from "../../../.next/dev/types/offerRegister.types";
import { createOfferRegisterApi } from "@/lib/register.axios";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { statusEnum } from "../../../.next/dev/types/skills.types";
import { useRouter } from "next/navigation";

function CreateRegister({
  title,
  offerId,
}: {
  title: string;
  offerId: string;
}): ReactNode {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Dialog */}
      <div className="hidden md:block">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-900 duration-150 cursor-pointer">
              {title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send your proposal</DialogTitle>
              <DialogDescription>
                The proposal will be sent to the offer wait for any
                notifications
              </DialogDescription>
            </DialogHeader>
            <OfferForm
              offerId={offerId}
              closeForm={() => {
                setDialogOpen(false);
                setDrawerOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Drawer */}
      <div className="block md:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-blue-700 rounded-full text-white hover:bg-blue-900 duration-150 cursor-pointer">
              {title}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-10">
            <DrawerHeader>
              <DrawerTitle>Create Skill Offer</DrawerTitle>
              <DrawerDescription>
                Post a skill request to find providers.
              </DrawerDescription>
            </DrawerHeader>
            <OfferForm
              offerId={offerId}
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

export default CreateRegister;
type OfferFormProps = React.ComponentProps<"form"> & {
  closeForm: () => void;
  offerId: string;
};
function OfferForm({ className, closeForm, offerId }: OfferFormProps) {
  const { user } = useAuth();
  const [offerRegister, setOfferRegister] = React.useState<Registeration>({
    offerId: { id: offerId, wantSkill: "" },
    description: "",
    providerId: {
      _id: user?._id!,
      username: "",
      profilePicture: "",
    },
  });
  console.log(offerId);

  const [loading, setLoading] = React.useState<Boolean>(false);
  const router = useRouter();
  const handleOfferRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(offerRegister?.offerId);

    if (!offerRegister?.offerId)
      return toast.error("Offer not found or may be removed");

    try {
      setLoading(true);
      const res = await createOfferRegisterApi.post(
        `/offerRegister/${offerRegister?.offerId.id}`,
        { description: offerRegister.description },
      );
      setOfferRegister(res.data.register);
      toast.success(res.data.message);
      console.log(res.data);
      setLoading(false);
      closeForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.success(err.response?.data.message);
        console.log(offerRegister?.offerId);
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
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Description</Label>
        <Textarea
          id="description"
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setOfferRegister({ ...offerRegister!, description: e.target.value })
          }
        />
      </div>

      <Button
        type="submit"
        className="cursor-pointer bg-blue-700 hover:bg-blue-900"
        onClick={handleOfferRegister}
      >
        Send Proposal
      </Button>
    </form>
  );
}
