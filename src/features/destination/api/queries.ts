import { Destination } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';

export const getDestinations = createListFetcher<Destination>({
  endpoint: '/api/destinations',
  defaultError: DESTINATION_ERRORS.GET_LIST_FAILED,
});

export const getDestinationById = createSingleFetcher<Destination>({
  baseUrl: process.env.APP_URL,
  endpoint: '/api/destinations',
  defaultError: DESTINATION_ERRORS.GET_FAILED,
});
