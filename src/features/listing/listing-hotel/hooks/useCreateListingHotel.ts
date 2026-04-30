'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LISTING_ERRORS, LISTING_QUERY_KEYS, LISTING_SUCCESS } from '../../constants';
import { createListingHotel } from '../api/mutations';
import { CreateListingHotelPayload } from '../types/mutations';

export const useCreateListingHotel = () => {
  return useMutation({
    mutationFn: (payload: CreateListingHotelPayload) => createListingHotel(payload),
    onSuccess: () => {
      toast.success(LISTING_SUCCESS.CREATED);
      queryClient.invalidateQueries({ queryKey: LISTING_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || LISTING_ERRORS.CREATE_FAILED);
    },
  });
};
