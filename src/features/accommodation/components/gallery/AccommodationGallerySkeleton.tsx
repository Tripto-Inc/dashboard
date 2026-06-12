'use client';

import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';

export const AccommodationGallerySkeleton: FC = () => {
  return (
    <ModificationFormSectionSkeleton>
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
          <Skeleton className="mb-6 h-58 w-full" />
          <div className="mb-5">
            <Skeleton className="size-24" />
          </div>
        </div>
        <div>
          <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
          <Skeleton className="mb-6 h-58 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-20" />
            <Skeleton className="size-20" />
            <Skeleton className="size-20" />
          </div>
        </div>
      </div>
    </ModificationFormSectionSkeleton>
  );
};
