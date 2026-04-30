'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrencyById } from '../api/queries';
import { CURRENCY_QUERY_KEYS } from '../constants';

export const useGetCurrency = (id: string) => {
  return useQuery({
    queryKey: CURRENCY_QUERY_KEYS.detail(id),
    queryFn: () => getCurrencyById(id),
    enabled: !!id,
  });
};
