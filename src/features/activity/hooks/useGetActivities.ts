'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../api/queries';
import { ACTIVITY_QUERY_KEYS } from '../constants';

export const useGetActivities = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACTIVITY_QUERY_KEYS.list(params),
    queryFn: () => getActivities(params),
  });
};
