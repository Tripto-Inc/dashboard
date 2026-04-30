'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getListings } from '../api/queries';
import { LISTING_QUERY_KEYS } from '../constants';

export const useGetListings = (params: ServerTableParams) => {
  return useQuery({
    queryKey: LISTING_QUERY_KEYS.list(params),
    queryFn: () => getListings(params),
  });
};
