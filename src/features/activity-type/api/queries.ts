import { createDropdownFetcher, createListFetcher, createSingleFetcher } from '@/utils/apiClient';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import { ActivityType, ActivityTypeOption } from '@/features/activity-type/types';

export const getActivityTypes = createListFetcher<ActivityType>({
  endpoint: '/api/activity-types',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});

export const getActivityTypeById = createSingleFetcher<ActivityType>({
  baseUrl: process.env.APP_URL,
  endpoint: '/api/activity-types',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_FAILED,
});

export const getActivityTypesDropdown = createDropdownFetcher<ActivityTypeOption>({
  endpoint: '/api/activity-types/dropdown?onlyActive=true',
  defaultError: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED,
});
