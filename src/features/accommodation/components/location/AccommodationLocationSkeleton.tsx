'use client';

import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

export const AccommodationLocationSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
      <Skeleton className="col-span-2 mb-6 h-100 w-full rounded-lg" />
      <FieldWithErrorSkeleton />
      <FieldWithErrorSkeleton />
      <FieldWithErrorSkeleton />
      <FieldWithErrorSkeleton />
      <FieldWithErrorSkeleton />
      <FieldWithErrorSkeleton />
    </div>
  );
};
