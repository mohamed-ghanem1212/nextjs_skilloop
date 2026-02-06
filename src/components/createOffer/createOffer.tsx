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
import { SkillOfferT } from "../../../.next/dev/types/skills.types";
import { createSkillOfferApi } from "@/lib/skillOffer.axios";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

function CreateOffer({ title }: { title: string }): ReactNode {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Dialog */}
      <div className="hidden md:block">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-400 text-white cursor-pointer hover:bg-gray-800 hover:text-white duration-150">
              {title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Skill Request</DialogTitle>
              <DialogDescription>
                Post a skill request to find providers.
              </DialogDescription>
            </DialogHeader>
            <OfferForm
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
            <Button variant="outline">Create Offer</Button>
          </DrawerTrigger>
          <DrawerContent className="p-10">
            <DrawerHeader>
              <DrawerTitle>Create Skill Offer</DrawerTitle>
              <DrawerDescription>
                Post a skill request to find providers.
              </DrawerDescription>
            </DrawerHeader>
            <OfferForm
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

export default CreateOffer;
type OfferFormProps = React.ComponentProps<"form"> & {
  closeForm: () => void;
};
function OfferForm({ className, closeForm }: OfferFormProps) {
  const [skillOffer, setSkillOffer] = React.useState<SkillOfferT>();
  const [loading, setLoading] = React.useState<Boolean>(false);
  const handleCreateSkillOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("wantSkill", skillOffer?.wantSkill!);
    form.append("description", skillOffer?.description!);
    form.append("level", String(skillOffer?.level));
    form.append("section", skillOffer?.section!);
    try {
      setLoading(true);
      const res = await createSkillOfferApi.post("/createSkillOffer", form, {
        headers: { "Content-Type": "application/json" },
      });
      setSkillOffer(res.data.createOffer);
      console.log(res.data);
      toast.success(res.data.message);
      closeForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);
        toast.error(err.response?.data.message);
        setLoading(false);
      } else {
        console.log("UNEXPECTED:", err);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label>Skill</Label>
        <Input
          type="text"
          id="skill"
          defaultValue="..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkillOffer({ ...skillOffer!, wantSkill: e.target.value })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">Description</Label>
        <Textarea
          className="resize-none overflow-y-auto h-18"
          id="descrip"
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSkillOffer({ ...skillOffer!, description: e.target.value })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label>Level</Label>
        <SelectSection
          values={lvl}
          value={skillOffer?.level}
          onChange={(value: any) =>
            setSkillOffer({ ...skillOffer!, level: value })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Section</Label>
        <SelectSection
          values={sections}
          value={skillOffer?.section!}
          onChange={(value: any) =>
            setSkillOffer({ ...skillOffer!, section: value })
          }
        />
      </div>

      <Button
        type="submit"
        className="cursor-pointer bg-blue-700 hover:bg-blue-900 text-center"
        onClick={handleCreateSkillOffer}
      >
        {loading ? <Spinner className="w-full" /> : "create"}
      </Button>
    </form>
  );
}
