'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { DestinationFormData } from '@/features/destination/types';
import { createDestination } from '@/features/destination/api/mutations';
import {
  DESTINATION_ERRORS,
  DESTINATION_QUERY_KEYS,
  DESTINATION_SUCCESS,
} from '@/features/destination/constants';

export const useCreateDestination = () => {
  return useMutation({
    mutationFn: (data: DestinationFormData) => createDestination(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DESTINATION_QUERY_KEYS.lists() });
      toast.success(DESTINATION_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || DESTINATION_ERRORS.CREATE_FAILED);
    },
  });
};
