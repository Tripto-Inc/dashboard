import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ModificationFormSectionSkeletonProps } from '@/components/shared/ModificationFormSection/types';

export const ModificationFormSectionSkeleton: FC<ModificationFormSectionSkeletonProps> = (
  props,
) => {
  const { children, hasSubtitle, headerExtraElements } = props;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-xl" />
          <div>
            <Skeleton className="h-6 w-45 rounded-sm" />
            {hasSubtitle && <Skeleton className="mt-0.5 h-3.5 w-50 rounded-[4px]" />}
          </div>
        </div>
        {headerExtraElements}
      </div>
      {children}
    </div>
  );
};
