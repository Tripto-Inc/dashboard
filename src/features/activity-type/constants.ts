import { ServerTableParams } from '@/components/shared/DataTable/types';

export const ACTIVITY_TYPE_QUERY_KEYS = {
  all: ['activity-types'] as const,
  lists: () => [...ACTIVITY_TYPE_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...ACTIVITY_TYPE_QUERY_KEYS.lists(), params] as const,
  details: () => [...ACTIVITY_TYPE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ACTIVITY_TYPE_QUERY_KEYS.details(), id] as const,
  dropdown: () => [...ACTIVITY_TYPE_QUERY_KEYS.all, 'dropdown'] as const,
};

export const ACTIVITY_TYPE_ERRORS = {
  DUPLICATE_NAME_TITLE: 'Activity type with this name and title already exists',
  DUPLICATE_TITLE: 'Activity type with this name already exists',
  NOT_FOUND: 'Activity type not found',
  ID_REQUIRED: 'Activity type id is required',
  IN_USE: 'Cannot delete activity type because it is being used by activities or accommodations',
  CREATE_FAILED: 'Failed to create activity type. Please try again.',
  UPDATE_FAILED: 'Failed to update activity type. Please try again.',
  DELETE_FAILED: 'Failed to delete activity type. Please try again.',
} as const;

export const ACTIVITY_TYPE_SUCCESS = {
  CREATED: 'Activity type created successfully',
  UPDATED: 'Activity type updated successfully',
  DELETED: 'Activity type deleted successfully',
} as const;
