'use client';

import { queryClient } from '@/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LISTING_ERRORS, LISTING_QUERY_KEYS, LISTING_SUCCESS } from '../../constants';
import { createListingHouse } from '../api/mutations';
import { ListingHouseFormData } from '../types/listingHouseForm';

export const useCreateListingHouse = () => {
  return useMutation({
    mutationFn: ({
      data,
      heroImage,
      galleryImages,
    }: {
      data: ListingHouseFormData;
      heroImage?: File | null;
      galleryImages?: Array<File> | null;
    }) => createListingHouse(data, heroImage, galleryImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTING_QUERY_KEYS.lists() });
      toast.success(LISTING_SUCCESS.CREATED);
    },
    onError: (error: Error) => {
      toast.error(error.message || LISTING_ERRORS.CREATE_FAILED);
    },
  });
};
