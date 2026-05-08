'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '../../constants';
import { updateHotel } from '../api/mutations';
import { UpdateHotelPayload } from '../types/mutations';

export const useUpdateHotel = () => {
  return useMutation({
    mutationFn: (payload: UpdateHotelPayload) => updateHotel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
      toast.success(ACCOMMODATION_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.UPDATE_FAILED);
    },
  });
};
