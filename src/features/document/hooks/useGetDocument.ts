import { useQuery } from '@tanstack/react-query';
import { getDocument } from '../api/queries';
import { DOCUMENT_QUERY_KEYS } from '../constants';
import { UseGetDocumentParams } from '../types';

export const useGetDocument = (params: UseGetDocumentParams) => {
  const { id, bucket, category } = params;

  return useQuery({
    queryKey: [...DOCUMENT_QUERY_KEYS.document({ id, bucket, category })],
    queryFn: () => getDocument(params),
  });
};
