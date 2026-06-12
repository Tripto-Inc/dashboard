import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { type FC, Fragment } from 'react';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';

export const DestinationFormSkeleton: FC = () => {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-9 w-60" />
          <Skeleton className="mt-1 h-6 w-full min-w-75 rounded-sm" />
        </div>
        <Skeleton className="h-10 w-37" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSectionSkeleton
            headerExtraElements={<Skeleton className="h-6 w-30 rounded-sm" />}
          >
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton className="md:col-span-2" />
            </div>
          </ModificationFormSectionSkeleton>
        </div>

        <div>
          <ModificationFormSectionSkeleton>
            <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </div>
          </ModificationFormSectionSkeleton>
        </div>
      </div>
    </Fragment>
  );
};
