'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LISTING_ERRORS, LISTING_QUERY_KEYS, LISTING_SUCCESS } from '../../constants';
import { updateListingHouse } from '../api/mutations';
import { ListingHouseFormData } from '../types/listingHouseForm';

export const useUpdateListingHouse = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
      heroImage,
      galleryImages,
    }: {
      id: string;
      data: ListingHouseFormData;
      heroImage?: File | null;
      galleryImages?: Array<File> | null;
    }) => updateListingHouse(id, data, heroImage, galleryImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTING_QUERY_KEYS.lists() });
      toast.success(LISTING_SUCCESS.UPDATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || LISTING_ERRORS.UPDATE_FAILED);
    },
  });
};
