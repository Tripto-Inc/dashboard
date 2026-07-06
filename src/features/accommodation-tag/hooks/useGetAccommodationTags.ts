'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getAccommodationTags } from '../api/queries';
import { ACCOMMODATION_TAG_QUERY_KEYS } from '../constants';

export const useGetAccommodationTags = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACCOMMODATION_TAG_QUERY_KEYS.list(params),
    queryFn: () => getAccommodationTags(params),
  });
};
