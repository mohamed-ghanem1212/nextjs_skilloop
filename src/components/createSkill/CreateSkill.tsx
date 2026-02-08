"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lvl, sections, SelectSection } from "../selection/Selection";
import { Skill } from "../../types.entities/skillData.types";
import axios from "axios";
import { createSkillApi } from "@/lib/skill.axios";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

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
              Create Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post your skill</DialogTitle>
              <DialogDescription>
                Share your expertise and let learners connect with you. Describe
                the skill, your experience level, and what you can teach.
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
            <Button className="bg-gray-800 text-white cursor-pointer hover:bg-gray-400 hover:text-white duration-150 w-full sm:w-auto">
              Create Skill
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4 sm:px-6 pb-8">
            <DrawerHeader className="px-0">
              <DrawerTitle>Post your skill</DrawerTitle>
              <DrawerDescription>
                Share your expertise and let learners connect with you. Describe
                the skill, your experience level, and what you can teach.
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

export default CreateSkill;

type OfferFormProps = React.ComponentProps<"form"> & {
  closeForm: () => void;
};

function OfferForm({ className, closeForm }: OfferFormProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [skill, setSkill] = React.useState<Skill>();

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", file!);
    form.append("skill", skill?.skill!);
    form.append("level", String(skill?.level));
    form.append("section", skill?.section!);
    form.append("description", skill?.description!);
    try {
      setLoading(true);
      const res = await createSkillApi.post("/createSkill", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSkill(res.data.newSkill);
      toast.success(res.data.message);
      console.log(res.data);
      setLoading(false);
      closeForm();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.error(err.response?.data.message);
        setLoading(false);
        console.log("HEADERS:", err.response?.headers);
      } else {
        console.log("UNEXPECTED:", err);
        setLoading(false);
        toast.error("Something went wrong please try again later");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <form className={cn("grid items-start gap-3 sm:gap-4 w-full", className)}>
      <div className="grid gap-2">
        <Label htmlFor="skill">Skill</Label>
        <Input
          type="text"
          id="skill"
          placeholder="Enter your skill..."
          className="w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkill({ ...skill!, skill: e.target.value })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="level">Level</Label>
        <SelectSection
          values={lvl}
          value={skill?.level!}
          onChange={(value: any) => setSkill({ ...skill!, level: value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className="resize-none overflow-y-auto h-20 w-full"
          id="description"
          placeholder="Describe your skill and what you can teach..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSkill({ ...skill!, description: e.target.value })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="section">Select your section</Label>
        <SelectSection
          values={sections}
          value={skill?.section!}
          onChange={(value: any) => setSkill({ ...skill!, section: value })}
        />
      </div>

      <div className="w-full flex flex-col items-center gap-3 my-2">
        <strong className="block w-full text-center line-clamp-1 text-sm px-2">
          {file ? file.name : "Upload photo"}
        </strong>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="upload"
          className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700 text-center w-full sm:w-auto max-w-xs duration-150 text-sm"
        >
          Upload Photo
        </label>
      </div>

      <Button
        type="submit"
        className="cursor-pointer bg-blue-700 hover:bg-blue-900 w-full h-10"
        onClick={handleCreateSkill}
        disabled={loading as boolean}
      >
        {loading ? <Spinner /> : "Create"}
      </Button>
    </form>
  );
}
