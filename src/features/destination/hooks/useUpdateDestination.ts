'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { DestinationFormData } from '@/features/destination/types';
import { updateDestination } from '@/features/destination/api/mutations';
import { DESTINATION_ERRORS, DESTINATION_SUCCESS } from '@/features/destination/constants';

export const useUpdateDestination = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DestinationFormData }) =>
      updateDestination(id, data),
    onSuccess: () => {
      toast.success(DESTINATION_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || DESTINATION_ERRORS.UPDATE_FAILED);
    },
  });
};
