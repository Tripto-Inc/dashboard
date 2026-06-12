import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { type FC, Fragment } from 'react';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';

export const ActivityFormSkeleton: FC = () => {
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
            </div>

            <div>
              <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
              <Skeleton className="mb-6 h-64 w-full" />
            </div>
          </ModificationFormSectionSkeleton>

          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </ModificationFormSectionSkeleton>
        </div>

        <div className="space-y-6">
          <ModificationFormSectionSkeleton>
            <FieldWithErrorSkeleton />
            <FieldWithErrorSkeleton />
            <FieldWithErrorSkeleton />
          </ModificationFormSectionSkeleton>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <Skeleton className="mb-2 h-7 w-40 rounded-sm" />
            <Skeleton className="mb-1 h-5 w-full rounded-sm" />
            <Skeleton className="mb-3 h-5 w-3/5 rounded-sm" />
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <Skeleton className="mb-2 h-6 w-30 rounded-sm" />
            <Skeleton className="h-9 w-60" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
