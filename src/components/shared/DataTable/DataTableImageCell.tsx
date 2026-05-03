'use client';

import { useGetDocument } from '@/features/document/hooks/useGetDocument';
import { FC } from 'react';
import { SafeImage } from '../SafeImage';
import { DataTableImageCellProps } from './types';

export const DataTableImageCell: FC<DataTableImageCellProps> = (props) => {
  const {
    id,
    bucket,
    title,
    placeholderPatternUrl,
    placeholderPatternSize,
    placeholderPatternOpacity,
  } = props;
  const { data, isLoading, isError } = useGetDocument({
    id,
    bucket,
    category: 'hero',
    object: `${id}/images/hero.webp`,
  });

  return (
    <div className="relative h-20 w-32 overflow-hidden rounded-sm">
      <SafeImage
        fill
        alt={title}
        src={data?.url}
        isError={isError}
        isLoading={isLoading}
        placeholderPatternUrl={placeholderPatternUrl}
        placeholderPatternSize={placeholderPatternSize}
        placeholderPatternOpacity={placeholderPatternOpacity}
        sizes="128px"
        className="object-cover"
      />
    </div>
  );
};
