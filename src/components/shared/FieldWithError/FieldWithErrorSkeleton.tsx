import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

export const FieldWithErrorSkeleton: FC = () => {
  return (
    <div>
      <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
      <Skeleton className="mb-6 h-11.5 w-full" />
    </div>
  );
};
