import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

export function SkeletonCard(): ReactNode {
  return (
    <Card className="w-full max-w-md sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-md animate-pulse h-full">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
  );
}
