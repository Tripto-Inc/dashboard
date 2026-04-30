'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LISTING_ERRORS, LISTING_QUERY_KEYS, LISTING_SUCCESS } from '../../constants';
import { updateListingHotel } from '../api/mutations';
import { UpdateListingHotelPayload } from '../types/mutations';

export const useUpdateListingHotel = () => {
  return useMutation({
    mutationFn: (payload: UpdateListingHotelPayload) => updateListingHotel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTING_QUERY_KEYS.lists() });
      toast.success(LISTING_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || LISTING_ERRORS.UPDATE_FAILED);
    },
  });
};
