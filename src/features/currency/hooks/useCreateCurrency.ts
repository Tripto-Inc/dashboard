'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCurrency } from '../api/mutations';
import { CURRENCY_ERRORS, CURRENCY_QUERY_KEYS, CURRENCY_SUCCESS } from '../constants';
import type { CurrencyFormData } from '../types';

export const useCreateCurrency = () => {
  return useMutation({
    mutationFn: (data: CurrencyFormData) => createCurrency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_QUERY_KEYS.lists() });
      toast.success(CURRENCY_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || CURRENCY_ERRORS.CREATE_FAILED);
    },
  });
};
