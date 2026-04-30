import { ServerTableParams } from '@/components/shared/DataTable/types';

export const CURRENCY_QUERY_KEYS = {
  all: ['currencies'] as const,
  lists: () => [...CURRENCY_QUERY_KEYS.all, 'list'] as const,
  list: (params: ServerTableParams) => [...CURRENCY_QUERY_KEYS.lists(), params] as const,
  details: () => [...CURRENCY_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CURRENCY_QUERY_KEYS.details(), id] as const,
  dropdown: () => [...CURRENCY_QUERY_KEYS.all, 'dropdown'] as const,
};

export const CURRENCY_ERRORS = {
  DUPLICATE_CODE_TITLE: 'Currency with this code and title already exists',
  DUPLICATE_TITLE: 'Currency with this name already exists',
  NOT_FOUND: 'Currency not found',
  ID_REQUIRED: 'Currency id is required',
  IN_USE: 'Cannot delete currency because it is being used by activities or listings',
  CREATE_FAILED: 'Failed to create currency. Please try again.',
  UPDATE_FAILED: 'Failed to update currency. Please try again.',
  DELETE_FAILED: 'Failed to delete currency. Please try again.',
} as const;

export const CURRENCY_SUCCESS = {
  CREATED: 'Currency created successfully',
  UPDATED: 'Currency updated successfully',
  DELETED: 'Currency deleted successfully',
} as const;
