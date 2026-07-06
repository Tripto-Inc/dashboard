'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAccommodationTag } from '../api/mutations';
import {
  ACCOMMODATION_TAG_ERRORS,
  ACCOMMODATION_TAG_QUERY_KEYS,
  ACCOMMODATION_TAG_SUCCESS,
} from '../constants';
import type { AccommodationTagFormData } from '../types';

export const useCreateAccommodationTag = () => {
  return useMutation({
    mutationFn: (data: AccommodationTagFormData) => createAccommodationTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_TAG_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_TAG_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_TAG_ERRORS.CREATE_FAILED);
    },
  });
};
