import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { Fragment, type FC } from 'react';

export const AccommodationFormSkeleton: FC = () => {
  return (
    <Fragment>
      <div className="mb-8">
        <Skeleton className="h-9 w-60" />
        <Skeleton className="mt-1 h-6 w-75 rounded-sm" />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-16.5 w-43.5 rounded-lg" />
        <Skeleton className="h-10 w-41.25" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>

            <div>
              <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
              <Skeleton className="mb-6 h-16 w-full" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <Skeleton className="mb-6 h-99.5 md:col-span-2" />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-10 w-full rounded-sm" />
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-12.5 w-34 rounded-sm" />
                <Skeleton className="h-12.5 w-34 rounded-sm" />
                <Skeleton className="h-12.5 w-34 rounded-sm" />
                <Skeleton className="h-12.5 w-34 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
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
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-10 w-full rounded-sm" />
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-9.5 w-28 rounded-full" />
                <Skeleton className="h-9.5 w-28 rounded-full" />
                <Skeleton className="h-9.5 w-28 rounded-full" />
                <Skeleton className="h-9.5 w-28 rounded-full" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
              <Skeleton className="h-6 w-45 rounded-sm" />
            </div>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-10 w-full rounded-sm" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Skeleton className="h-13.5 w-full rounded-md" />
                <Skeleton className="h-13.5 w-full rounded-md" />
                <Skeleton className="h-13.5 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
