'use client';

import { useQuery } from '@tanstack/react-query';
import { getDestinationById } from '../api/queries';
import { DESTINATION_QUERY_KEYS } from '../constants';

export const useGetDestination = (id: string) => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.detail(id),
    queryFn: () => getDestinationById(id),
    enabled: !!id,
  });
};
