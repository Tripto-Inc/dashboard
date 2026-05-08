import { ServerTableParams } from '@/components/shared/DataTable/types';

export const ACTIVITY_QUERY_KEYS = {
  all: ['activities'] as const,
  lists: () => [...ACTIVITY_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...ACTIVITY_QUERY_KEYS.lists(), params] as const,
  details: () => [...ACTIVITY_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ACTIVITY_QUERY_KEYS.details(), id] as const,
  dropdown: () => [...ACTIVITY_QUERY_KEYS.all, 'dropdown'] as const,
};

export const ACTIVITY_ERRORS = {
  DUPLICATE: 'Activity with this title, address and activity type already exists',
  DUPLICATE_TITLE: 'Activity with this name already exists',
  NOT_FOUND: 'Activity not found',
  ID_REQUIRED: 'Activity id is required',
  IN_USE: 'Cannot delete activity because it is being used by activities or accommodations',
  CREATE_FAILED: 'Failed to create activity. Please try again.',
  UPDATE_FAILED: 'Failed to update activity. Please try again.',
  DELETE_FAILED: 'Failed to delete activity. Please try again.',
} as const;

export const ACTIVITY_SUCCESS = {
  CREATED: 'Activity created successfully',
  UPDATED: 'Activity updated successfully',
  DELETED: 'Activity deleted successfully',
} as const;
