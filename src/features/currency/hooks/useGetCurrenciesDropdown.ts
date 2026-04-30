'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrenciesDropdown } from '../api/queries';
import { CURRENCY_QUERY_KEYS } from '../constants';

export const useGetCurrenciesDropdown = (onlyActive: boolean = true) => {
  return useQuery({
    queryKey: [...CURRENCY_QUERY_KEYS.dropdown(), { onlyActive }],
    queryFn: () => getCurrenciesDropdown(onlyActive),
  });
};
