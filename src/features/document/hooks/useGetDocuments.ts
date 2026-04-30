import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../api/queries';
import { DOCUMENT_QUERY_KEYS } from '../constants';
import { UseGetDocumentsParams } from '../types';

export const useGetDocuments = (params: UseGetDocumentsParams) => {
  const { id, bucket, category } = params;

  return useQuery({
    queryKey: [...DOCUMENT_QUERY_KEYS.documents({ id, bucket, category })],
    queryFn: () => getDocuments(params),
  });
};
