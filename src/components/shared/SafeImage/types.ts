import { ImageProps } from 'next/image';
import { ReactNode } from 'react';

export type SafeImageProps = {
  src?: string;
  alt: string;
  widthClassName?: string;
  heightClassName?: string;
  fallback?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  placeholderPatternUrl?: string;
  placeholderPatternSize?: number;
  placeholderPatternOpacity?: number;
} & Omit<ImageProps, 'src' | 'alt'>;
