import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

export const AvatarDropdownSkeleton: FC = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex flex-1 flex-col items-end justify-between gap-1">
        <Skeleton className="h-5 w-25 rounded-[4px]" />
        <Skeleton className="h-4 w-35 rounded-[4px]" />
      </div>
      <Skeleton className="size-10 rounded-full" />
    </div>
  );
};
