'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteDestination } from '@/features/destination/api/mutations';
import {
  DESTINATION_ERRORS,
  DESTINATION_QUERY_KEYS,
  DESTINATION_SUCCESS,
} from '@/features/destination/constants';

export const useDeleteDestination = () => {
  return useMutation({
    mutationFn: (id: string) => deleteDestination(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DESTINATION_QUERY_KEYS.lists() });
      toast.success(DESTINATION_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || DESTINATION_ERRORS.DELETE_FAILED);
    },
  });
};
