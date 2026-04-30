'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateActivity } from '../api/mutations';
import { ACTIVITY_ERRORS, ACTIVITY_SUCCESS } from '../constants';
import type { ActivityFormData } from '../types';

export const useUpdateActivity = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
      heroImage,
    }: {
      id: string;
      data: ActivityFormData;
      heroImage?: File | null;
    }) => updateActivity(id, data, heroImage),
    onSuccess: () => {
      toast.success(ACTIVITY_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACTIVITY_ERRORS.UPDATE_FAILED);
    },
  });
};
