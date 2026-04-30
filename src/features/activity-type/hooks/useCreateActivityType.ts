'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createActivityType } from '../api/mutations';
import {
  ACTIVITY_TYPE_ERRORS,
  ACTIVITY_TYPE_QUERY_KEYS,
  ACTIVITY_TYPE_SUCCESS,
} from '../constants';
import type { ActivityTypeFormData } from '../types';

export const useCreateActivityType = () => {
  return useMutation({
    mutationFn: (data: ActivityTypeFormData) => createActivityType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_TYPE_QUERY_KEYS.lists() });
      toast.success(ACTIVITY_TYPE_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_TYPE_ERRORS.CREATE_FAILED);
    },
  });
};
