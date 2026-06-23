import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';
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

export const getActivityTypesDropdown = async (
  onlyActive: boolean = true,
): Promise<ActivityTypeOption[]> => {
  // const activityTypes = await prisma.activityType.findMany({
  //   where: onlyActive ? { isActive: true } : undefined,
  //   orderBy: { title: 'asc' },
  //   select: {
  //     id: true,
  //     emoji: true,
  //     title: true,
  //   },
  // });
  //
  // return activityTypes.map((activityType) => ({
  //   value: activityType.id,
  //   label: `${activityType.emoji} - ${activityType.title}`,
  // }));

  return [];
};
