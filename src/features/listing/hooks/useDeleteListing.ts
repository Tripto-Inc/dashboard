'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteListing } from '../api/mutations';
import { LISTING_ERRORS, LISTING_QUERY_KEYS, LISTING_SUCCESS } from '../constants';

export const useDeleteListing = () => {
  return useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTING_QUERY_KEYS.lists() });
      toast.success(LISTING_SUCCESS.DELETED);
    },
    onError: (error: Error) => {
      toast.error(error.message || LISTING_ERRORS.DELETE_FAILED);
    },
  });
};
