import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { UserProfileFieldSkeleton } from './UserProfileFieldSkeleton';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';

export const UserProfileFormSkeleton: FC = () => {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-9 w-40" />
          <Skeleton className="mt-1 h-6 w-full min-w-75 rounded-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <Skeleton className="h-30 w-full rounded-br-none rounded-bl-none" />
            <div className="-mt-12 px-6 pb-6">
              <div className="relative inline-block">
                <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-xl">
                  <Skeleton className="flex h-full w-full rounded-xl" />
                </div>
              </div>

              <div className="mt-4">
                <Skeleton className="mb-0.5 h-6 w-1/3 min-w-28 rounded-sm" />
                <Skeleton className="mt-2 h-5 w-2/5 min-w-36 rounded-sm" />
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-5 w-20 rounded-sm" />
                  <Skeleton className="h-5 w-26 rounded-sm" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-5 w-20 rounded-sm" />
                  <Skeleton className="h-5 w-26 rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6">
              <Skeleton className="mb-2 h-7 w-40 rounded-sm" />
              <Skeleton className="mb-1 h-5 w-full rounded-sm" />
              <Skeleton className="mb-3 h-5 w-3/5 rounded-sm" />
              <Skeleton className="mt-auto h-9 w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
            </div>
          </ModificationFormSectionSkeleton>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Skeleton className="flex size-10 items-center justify-center rounded-lg" />
              <div>
                <Skeleton className="mb-0.5 h-4.5 w-36 rounded-sm" />
                <Skeleton className="mt-0.5 h-3.5 w-50 rounded-[4px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <UserProfileFieldSkeleton />
              <UserProfileFieldSkeleton />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
