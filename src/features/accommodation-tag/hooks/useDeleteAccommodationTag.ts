'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteAccommodationTag } from '../api/mutations';
import {
  ACCOMMODATION_TAG_ERRORS,
  ACCOMMODATION_TAG_QUERY_KEYS,
  ACCOMMODATION_TAG_SUCCESS,
} from '../constants';

export const useDeleteAccommodationTag = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAccommodationTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_TAG_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_TAG_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_TAG_ERRORS.DELETE_FAILED);
    },
  });
};
