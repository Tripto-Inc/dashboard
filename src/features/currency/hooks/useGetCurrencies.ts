'use client';

import { ServerTableParams } from '@/components/shared/DataTable/types';
import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '../api/queries';
import { CURRENCY_QUERY_KEYS } from '../constants';

export const useGetCurrencies = (params: ServerTableParams) => {
  return useQuery({
    queryKey: CURRENCY_QUERY_KEYS.list(params),
    queryFn: () => getCurrencies(params),
  });
};
