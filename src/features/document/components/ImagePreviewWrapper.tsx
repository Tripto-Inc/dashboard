'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImagePreview } from '@/features/document/components/ImagePreview';
import { queryClient } from '@/lib/query-client';
import clsx from 'clsx';
import { FC } from 'react';
import { DOCUMENT_QUERY_KEYS } from '../constants';
import { useDeleteDocument } from '../hooks/useDeleteDocument';
import { useGetDocument } from '../hooks/useGetDocument';
import { ImagePreviewWrapperProps } from '../types';

export const ImagePreviewWrapper: FC<ImagePreviewWrapperProps> = (props) => {
  const { id, title, bucket, object, className, category = 'hero' } = props;
  const { data, isLoading } = useGetDocument({
    id,
    bucket,
    object,
    category,
  });

  const deleteDocumentMutation = useDeleteDocument();

  if (isLoading) return <Skeleton className={clsx('rounded-lg', className || 'mb-10 size-24')} />;

  return (
    <ImagePreview
      title={title}
      src={data?.url}
      className={clsx('rounded-lg', className || 'mb-10 size-24')}
      onDelete={() => {
        deleteDocumentMutation
          .mutateAsync({
            bucket,
            object,
          })
          .then(() =>
            queryClient.removeQueries({
              queryKey: [...DOCUMENT_QUERY_KEYS.document({ id, bucket, category })],
            }),
          );
      }}
    />
  );
};
