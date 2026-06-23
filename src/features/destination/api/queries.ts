import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { Destination } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const getDestinations = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<Destination>> => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', params.page.toString());
  searchParams.set('pageSize', params.pageSize.toString());

  if (params.filter) searchParams.set('filter', params.filter);
  if (params.sort?.[0]) {
    searchParams.set('sortBy', params.sort[0].id);
    searchParams.set('sortOrder', params.sort[0].desc ? 'desc' : 'asc');
  }

  const response = await fetch(`/api/destinations?${searchParams.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.GET_LIST_FAILED);
  }

  return response.json();
};

export const getDestinationById = async (id: string): Promise<Destination> => {
  const response = await fetch(`/api/destinations/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.GET_FAILED);
  }

  return response.json();
};
