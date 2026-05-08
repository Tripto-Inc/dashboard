import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

export const UserProfileFieldSkeleton: FC = () => {
  return (
    <div>
      <Skeleton className="mb-2 h-5 w-30 rounded-sm" />
      <Skeleton className="h-11.5 w-full" />
    </div>
  );
};
