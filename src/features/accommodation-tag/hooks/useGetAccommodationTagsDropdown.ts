'use client';

import { useQuery } from '@tanstack/react-query';
import { getAccommodationTagsDropdown } from '../api/queries';
import { ACCOMMODATION_TAG_QUERY_KEYS } from '../constants';

export const useGetAccommodationTagsDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...ACCOMMODATION_TAG_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getAccommodationTagsDropdown(onlyActive),
  });
};
