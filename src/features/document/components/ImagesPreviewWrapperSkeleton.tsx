import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import { FC } from 'react';
import { ImagesPreviewWrapperSkeletonProps } from '../types';

export const ImagesPreviewWrapperSkeleton: FC<ImagesPreviewWrapperSkeletonProps> = (props) => {
  const { count = 3, className } = props;
  const galleryImages = Array.from({ length: count });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {galleryImages.map((_, index) => (
        <Skeleton key={index} className={clsx('rounded-lg', className || 'mb-10 size-20')} />
      ))}
    </div>
  );
};
