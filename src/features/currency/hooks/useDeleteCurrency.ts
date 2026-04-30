'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCurrency } from '../api/mutations';
import { CURRENCY_ERRORS, CURRENCY_QUERY_KEYS, CURRENCY_SUCCESS } from '../constants';

export const useDeleteCurrency = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCurrency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_QUERY_KEYS.lists() });
      toast.success(CURRENCY_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || CURRENCY_ERRORS.DELETE_FAILED);
    },
  });
};
