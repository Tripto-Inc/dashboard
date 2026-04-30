'use client';

import { useQuery } from '@tanstack/react-query';
import { getActivityTypesDropdown } from '../api/queries';
import { ACTIVITY_TYPE_QUERY_KEYS } from '../constants';

export const useGetActivityTypesDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...ACTIVITY_TYPE_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getActivityTypesDropdown(onlyActive),
  });
};
