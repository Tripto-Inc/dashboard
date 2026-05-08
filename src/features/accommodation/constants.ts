import { ServerTableParams } from '@/components/shared/DataTable/types';

export const ACCOMMODATION_QUERY_KEYS = {
  all: ['accommodations'] as const,
  lists: () => [...ACCOMMODATION_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...ACCOMMODATION_QUERY_KEYS.lists(), params] as const,
  details: () => [...ACCOMMODATION_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ACCOMMODATION_QUERY_KEYS.details(), id] as const,
  dropdown: () => [...ACCOMMODATION_QUERY_KEYS.all, 'dropdown'] as const,
};

export const ACCOMMODATION_ERRORS = {
  DUPLICATE: 'Accommodation with this address and title already exists',
  DUPLICATE_TITLE: 'Accommodation with this name already exists',
  NOT_FOUND: 'Accommodation not found',
  ID_REQUIRED: 'Accommodation id is required',
  IN_USE: 'Cannot delete accommodation because it is being used by activities or accommodations',
  CREATE_FAILED: 'Failed to create accommodation. Please try again.',
  UPDATE_FAILED: 'Failed to update accommodation. Please try again.',
  DELETE_FAILED: 'Failed to delete accommodation. Please try again.',
} as const;

export const ACCOMMODATION_SUCCESS = {
  CREATED: 'Accommodation created successfully',
  UPDATED: 'Accommodation updated successfully',
  DELETED: 'Accommodation deleted successfully',
} as const;
