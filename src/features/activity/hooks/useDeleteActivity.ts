'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteActivity } from '../api/mutations';
import { ACTIVITY_ERRORS, ACTIVITY_QUERY_KEYS, ACTIVITY_SUCCESS } from '../constants';

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_QUERY_KEYS.lists() });
      toast.success(ACTIVITY_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_ERRORS.DELETE_FAILED);
    },
  });
};
