'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateAccommodationTag } from '../api/mutations';
import { ACCOMMODATION_TAG_ERRORS, ACCOMMODATION_TAG_SUCCESS } from '../constants';
import type { AccommodationTagFormData } from '../types';

export const useUpdateAccommodationTag = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccommodationTagFormData }) =>
      updateAccommodationTag(id, data),
    onSuccess: () => {
      toast.success(ACCOMMODATION_TAG_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED);
    },
  });
};
