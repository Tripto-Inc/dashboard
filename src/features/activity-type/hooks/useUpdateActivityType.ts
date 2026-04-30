'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateActivityType } from '../api/mutations';
import { ACTIVITY_TYPE_ERRORS, ACTIVITY_TYPE_SUCCESS } from '../constants';
import type { ActivityTypeFormData } from '../types';

export const useUpdateActivityType = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ActivityTypeFormData }) =>
      updateActivityType(id, data),
    onSuccess: () => {
      toast.success(ACTIVITY_TYPE_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_TYPE_ERRORS.UPDATE_FAILED);
    },
  });
};
