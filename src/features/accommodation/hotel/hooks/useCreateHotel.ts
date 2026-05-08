'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ACCOMMODATION_ERRORS,
  ACCOMMODATION_QUERY_KEYS,
  ACCOMMODATION_SUCCESS,
} from '../../constants';
import { createHotel } from '../api/mutations';
import { CreateHotelPayload } from '../types/mutations';

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: (payload: CreateHotelPayload) => createHotel(payload),
    onSuccess: () => {
      toast.success(ACCOMMODATION_SUCCESS.CREATED);
      queryClient.invalidateQueries({ queryKey: ACCOMMODATION_QUERY_KEYS.lists() });
    },
    onError: (error: Error) => {
      toast.error(error.message || ACCOMMODATION_ERRORS.CREATE_FAILED);
    },
  });
};
