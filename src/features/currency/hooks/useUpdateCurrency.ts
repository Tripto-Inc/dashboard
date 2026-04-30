'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrency } from '../api/mutations';
import { CURRENCY_ERRORS, CURRENCY_SUCCESS } from '../constants';
import type { CurrencyFormData } from '../types';

export const useUpdateCurrency = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CurrencyFormData }) => updateCurrency(id, data),
    onSuccess: () => {
      toast.success(CURRENCY_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || CURRENCY_ERRORS.UPDATE_FAILED);
    },
  });
};
