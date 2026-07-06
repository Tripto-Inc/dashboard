import { ServerTableParams } from '@/components/shared/DataTable/types';

export const ACCOMMODATION_TAG_QUERY_KEYS = {
  all: ['accommodation-tags'] as const,
  lists: () => [...ACCOMMODATION_TAG_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...ACCOMMODATION_TAG_QUERY_KEYS.lists(), params] as const,
  dropdown: () => [...ACCOMMODATION_TAG_QUERY_KEYS.all, 'dropdown'] as const,
};

export const ACCOMMODATION_TAG_ERRORS = {
  DUPLICATE_NAME_TITLE: 'Accommodation tag with this name and title already exists',
  DUPLICATE_TITLE: 'Accommodation tag with this name already exists',
  NOT_FOUND: 'Accommodation tag not found',
  ID_REQUIRED: 'Accommodation tag id is required',
  IN_USE: 'Cannot delete accommodation tag because it is being used by activities or accommodations',
  GET_FAILED: 'Failed to get accommodation tag. Please try again.',
  GET_LIST_FAILED: 'Failed to get accommodation tags. Please try again.',
  CREATE_FAILED: 'Failed to create accommodation tag. Please try again.',
  UPDATE_FAILED: 'Failed to update accommodation tag. Please try again.',
  DELETE_FAILED: 'Failed to delete accommodation tag. Please try again.',
} as const;

export const ACCOMMODATION_TAG_SUCCESS = {
  CREATED: 'Accommodation tag created successfully',
  UPDATED: 'Accommodation tag updated successfully',
  DELETED: 'Accommodation tag deleted successfully',
} as const;
