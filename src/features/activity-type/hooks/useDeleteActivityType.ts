'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteActivityType } from '../api/mutations';
import {
  ACTIVITY_TYPE_ERRORS,
  ACTIVITY_TYPE_QUERY_KEYS,
  ACTIVITY_TYPE_SUCCESS,
} from '../constants';

export const useDeleteActivityType = () => {
  return useMutation({
    mutationFn: (id: string) => deleteActivityType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_TYPE_QUERY_KEYS.lists() });
      toast.success(ACTIVITY_TYPE_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_TYPE_ERRORS.DELETE_FAILED);
    },
  });
};
