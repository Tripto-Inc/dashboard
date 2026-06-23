import { ServerTableParams } from '@/components/shared/DataTable/types';

export const DESTINATION_QUERY_KEYS = {
  all: ['destinations'] as const,
  lists: () => [...DESTINATION_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...DESTINATION_QUERY_KEYS.lists(), params] as const,
  details: () => [...DESTINATION_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...DESTINATION_QUERY_KEYS.details(), id] as const,
};

export const DESTINATION_ERRORS = {
  DUPLICATE_LOCATION_SLOGAN: 'Destination with this city, country and slogan already exists',
  DUPLICATE_TITLE: 'Destination with this name already exists',
  NOT_FOUND: 'Destination not found',
  ID_REQUIRED: 'Destination id is required',
  NO_ACCOMMODATION_IN_LOCATION: 'No accommodation exists for this location',
  CREATE_FAILED: 'Failed to create destination. Please try again.',
  UPDATE_FAILED: 'Failed to update destination. Please try again.',
  DELETE_FAILED: 'Failed to delete destination. Please try again.',
} as const;

export const DESTINATION_SUCCESS = {
  CREATED: 'Destination created successfully',
  UPDATED: 'Destination updated successfully',
  DELETED: 'Destination deleted successfully',
} as const;
