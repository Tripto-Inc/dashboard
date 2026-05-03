'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { FC, useState } from 'react';
import { SafeImageProps } from './types';

export const SafeImage: FC<SafeImageProps> = (props) => {
  const {
    src,
    alt,
    fallback,
    className,
    isError = false,
    isLoading = false,
    placeholderPatternSize = 60,
    placeholderPatternOpacity = 0.5,
    placeholderPatternUrl = '/icons/patterns/image-placeholer/global.svg',
    ...otherProps
  } = props;
  const [failed, setFailed] = useState(false);

  if (isLoading) {
    return <Skeleton className={className} />;
  }

  if (isError) {
    return (
      <div className="border-destructive text-destructive flex h-20 w-32 items-center justify-center rounded-sm border text-xs">
        Error
      </div>
    );
  }

  if (!src || failed) {
    return (
      fallback ?? (
        <div className="relative h-full w-full bg-slate-100">
          <div
            className="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 -rotate-45"
            style={{
              backgroundRepeat: 'repeat',
              opacity: placeholderPatternOpacity,
              backgroundImage: `url(${placeholderPatternUrl})`,
              backgroundSize: `${placeholderPatternSize}px ${placeholderPatternSize}px`,
            }}
          />
        </div>
      )
    );
  }

  return (
    <Image
      {...otherProps}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
