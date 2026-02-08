import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import userPic from "../../../public/images/user.svg";
import Link from "next/link";
import Image from "next/image";
function UnAuthUser(): ReactNode {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="w-60 h-60">
            <Image
              alt="User not authenticated"
              src={userPic}
              className="grayscale"
              width={240}
              height={240}
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User not authenticated</EmptyTitle>
        <EmptyDescription>
          Please log in to view your profile and access your offers and skills.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/auth">
          <Button
            size="sm"
            className="bg-blue-700 hover:bg-blue-900 cursor-pointer"
          >
            Verify your profile
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
export default UnAuthUser;
