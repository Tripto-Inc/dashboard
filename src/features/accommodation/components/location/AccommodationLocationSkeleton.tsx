'use client';

import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';

export const AccommodationLocationSkeleton: FC = () => {
  return (
    <ModificationFormSectionSkeleton>
      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
        <Skeleton className="mb-6 h-99.5 md:col-span-2" />
        <FieldWithErrorSkeleton />
        <FieldWithErrorSkeleton />
        <FieldWithErrorSkeleton />
        <FieldWithErrorSkeleton />
        <FieldWithErrorSkeleton />
        <FieldWithErrorSkeleton />
      </div>
    </ModificationFormSectionSkeleton>
  );
};
