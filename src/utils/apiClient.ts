import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';

type FetchListOptions = {
  endpoint: string;
  baseUrl?: string;
  defaultError: string;
};

type FetchDropdownOptions = {
  endpoint: string;
  baseUrl?: string;
  defaultError: string;
};

export const createDropdownFetcher = <T>({
  endpoint,
  defaultError,
  baseUrl,
}: FetchDropdownOptions) => {
  return async (onlyActive: boolean = true): Promise<T[]> => {
    const searchParams = new URLSearchParams();
    searchParams.set('onlyActive', String(onlyActive));

    const url = baseUrl
      ? `${baseUrl}${endpoint}?${searchParams.toString()}`
      : `${endpoint}?${searchParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};

export const createListFetcher = <T>({ endpoint, defaultError, baseUrl }: FetchListOptions) => {
  return async (params: ServerTableParams): Promise<ServerTableResponse<T>> => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page.toString());
    searchParams.set('pageSize', params.pageSize.toString());

    if (params.filter) searchParams.set('filter', params.filter);
    if (params.sort?.[0]) {
      searchParams.set('sortBy', params.sort[0].id);
      searchParams.set('sortOrder', params.sort[0].desc ? 'desc' : 'asc');
    }

    const url = baseUrl
      ? `${baseUrl}${endpoint}?${searchParams.toString()}`
      : `${endpoint}?${searchParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};

export const createSingleFetcher = <T>({ endpoint, defaultError, baseUrl }: FetchListOptions) => {
  return async (id: string): Promise<T> => {
    const url = baseUrl ? `${baseUrl}${endpoint}/${id}` : `${endpoint}/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};
