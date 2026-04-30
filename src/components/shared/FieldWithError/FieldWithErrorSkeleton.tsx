import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

export const FieldWithErrorSkeleton: FC = () => {
    return (
        <div>
            <Skeleton className="h-5 w-30 rounded-sm mb-1" />
            <Skeleton className="h-11.5 w-full mb-6" />
        </div>
    )
}