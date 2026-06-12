import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';
import { FieldWithErrorSkeletonProps } from '@/components/shared/FieldWithError/types';

export const FieldWithErrorSkeleton: FC<FieldWithErrorSkeletonProps> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <Skeleton className="mb-1 h-5 w-30 rounded-sm" />
      <Skeleton className='mb-6 h-11.5 w-full' />
    </div>
  );
};
