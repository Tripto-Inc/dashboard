'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getActivityTypes } from '../api/queries';
import { ACTIVITY_TYPE_QUERY_KEYS } from '../constants';

export const useGetActivityTypes = (params: ServerTableParams) => {
  return useQuery({
    queryKey: ACTIVITY_TYPE_QUERY_KEYS.list(params),
    queryFn: () => getActivityTypes(params),
  });
};
