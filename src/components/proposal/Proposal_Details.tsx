import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { createOfferRegisterApi } from "@/lib/register.axios";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function Proposal_Details({
  _id,
  wantSkill,
  profilePicture,
  username,
  description,
  title,
}: {
  _id: string;
  wantSkill: string;
  profilePicture: string;
  username: string;
  description: string;
  title: string;
}) {
  const [loading, setLoading] = useState<Boolean>(false);
  const [updateProposal, setUpdateProposal] = useState();
  const router = useRouter();
  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createOfferRegisterApi.put(`/updateRegister/${_id}`);
      setUpdateProposal(res.data.updateRegister);
      toast.success(res.data.message);
      router.push("/chat");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        toast.error(
          err.response?.data.message ||
            "Something went wrong please try again later",
        );
        setLoading(false);
        console.log("HEADERS:", err.response?.headers);
      } else {
        console.log("UNEXPECTED:", err);
        setLoading(false);
        toast.error("Something went wrong please try again later");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Show Details</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="mb-5 w-full">
              <div className="flex flex-row items-center gap-6 w-full">
                <div>
                  <Image
                    width={200}
                    height={200}
                    className="w-16"
                    src={profilePicture}
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h4 className="">{username}</h4>
                  <h5 className="text-sm text-gray-500 font-thin">{title}</h5>
                </div>
              </div>
            </DialogTitle>
            <h2 className="text-center font-bold">Required: {wantSkill}</h2>
            <DialogDescription>{description}</DialogDescription>

            <Separator className="bg-gray-800 mt-3" />
            <DialogFooter className="flex flex-row gap-10 mt-5">
              <Button
                className="bg-green-500 hover:bg-green-800"
                onClick={handleUpdateStatus}
              >
                Accept
              </Button>
              <DialogClose asChild>
                <Button className="bg-red-500 hover:bg-red-800">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Proposal_Details;
