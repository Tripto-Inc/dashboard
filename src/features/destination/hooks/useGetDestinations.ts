'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '../api/queries';
import { DESTINATION_QUERY_KEYS } from '../constants';

export const useGetDestinations = (params: ServerTableParams) => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.list(params),
    queryFn: () => getDestinations(params),
  });
};
