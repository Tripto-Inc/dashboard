import { ServerTableParams } from '@/components/shared/DataTable/types';

export const LISTING_QUERY_KEYS = {
  all: ['listings'] as const,
  lists: () => [...LISTING_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...LISTING_QUERY_KEYS.lists(), params] as const,
  details: () => [...LISTING_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...LISTING_QUERY_KEYS.details(), id] as const,
  dropdown: () => [...LISTING_QUERY_KEYS.all, 'dropdown'] as const,
};

export const LISTING_ERRORS = {
  DUPLICATE: 'Listing with this address and title already exists',
  DUPLICATE_TITLE: 'Listing with this name already exists',
  NOT_FOUND: 'Listing not found',
  ID_REQUIRED: 'Listing id is required',
  IN_USE: 'Cannot delete listing because it is being used by activities or listings',
  CREATE_FAILED: 'Failed to create listing. Please try again.',
  UPDATE_FAILED: 'Failed to update listing. Please try again.',
  DELETE_FAILED: 'Failed to delete listing. Please try again.',
} as const;

export const LISTING_SUCCESS = {
  CREATED: 'Listing created successfully',
  UPDATED: 'Listing updated successfully',
  DELETED: 'Listing deleted successfully',
} as const;
