'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import prisma from '@/lib/prisma';
import { ACTIVITY_TYPE_ERRORS } from '../constants';
import { ActivityType, ActivityTypeOption } from '../types';

export const getActivityTypes = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<ActivityType>> => {
  const { page, pageSize, filter, sort } = params;
  const take = pageSize;
  const skip = (page - 1) * pageSize;
  const sortBy = sort[0]?.id;
  const sortOrder = sort[0]?.desc ? 'desc' : 'asc';
  const where = filter
    ? {
        OR: [
          { name: { contains: filter, mode: 'insensitive' as const } },
          { icon: { contains: filter, mode: 'insensitive' as const } },
          { emoji: { contains: filter, mode: 'insensitive' as const } },
          { title: { contains: filter, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: 'desc' as const };

  const [activityTypes, total] = await Promise.all([
    prisma.activityType.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.activityType.count({ where }),
  ]);

  return {
    data: activityTypes,
    total,
  };
};

export const getActivityTypeById = async (id: string): Promise<ActivityType> => {
  const activityType = await prisma.activityType.findUnique({
    where: { id },
  });

  if (!activityType) {
    throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);
  }

  return activityType;
};

export const getActivityTypesDropdown = async (
  onlyActive: boolean = true,
): Promise<ActivityTypeOption[]> => {
  const activityTypes = await prisma.activityType.findMany({
    where: onlyActive ? { isActive: true } : undefined,
    orderBy: { title: 'asc' },
    select: {
      id: true,
      emoji: true,
      title: true,
    },
  });

  return activityTypes.map((activityType) => ({
    value: activityType.id,
    label: `${activityType.emoji} - ${activityType.title}`,
  }));
};
