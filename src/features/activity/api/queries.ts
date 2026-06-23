import { ACTIVITY_ERRORS } from '../constants';
import { ActivityColumnDTO, ActivityDTO } from '../types';
import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';

export const getActivities = createListFetcher<ActivityColumnDTO>({
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_LIST_FAILED,
});

export const getActivityById = createSingleFetcher<ActivityDTO>({
  baseUrl: process.env.APP_URL,
  endpoint: '/api/activities',
  defaultError: ACTIVITY_ERRORS.GET_FAILED,
});
