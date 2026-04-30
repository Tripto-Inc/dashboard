'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useGetDocument } from '@/features/document/hooks/useGetDocument';
import Image from 'next/image';
import { FC } from 'react';
import { DataTableImageCellProps } from './types';

export const DataTableImageCell: FC<DataTableImageCellProps> = (props) => {
  const { id, title, bucket } = props;
  const { data, isLoading } = useGetDocument({
    id,
    bucket,
    category: 'hero',
    object: `${id}/images/hero.webp`,
  });

  if (isLoading) return <Skeleton className="h-20 w-32 rounded-sm" />;

  return (
    <div className="relative h-20 w-32 overflow-hidden rounded-sm">
      {data?.url && <Image fill alt={title} src={data.url} className="object-cover" />}
    </div>
  );
};
