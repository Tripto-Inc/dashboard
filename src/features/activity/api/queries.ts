'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { prisma } from '@/lib/prisma';
import { ACTIVITY_ERRORS } from '../constants';
import { ActivityColumnDTO, ActivityDTO } from '../types';

export const getActivities = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<ActivityColumnDTO>> => {
  const { page, pageSize, filter, sort } = params;
  const take = pageSize;
  const skip = (page - 1) * pageSize;
  const sortBy = sort[0]?.id;
  const sortOrder = sort[0]?.desc ? 'desc' : 'asc';
  const where = filter
    ? {
      OR: [
        { title: { contains: filter, mode: 'insensitive' as const } },
        {
          address: {
            country: { contains: filter, mode: 'insensitive' as const },
          },
        },
        {
          address: {
            city: { contains: filter, mode: 'insensitive' as const },
          },
        },
        {
          activityType: {
            title: { contains: filter, mode: 'insensitive' as const },
          },
        },
        { price: { equals: +filter } },
        { discount: { equals: +filter } },
      ],
    }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: 'desc' as const };

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        address: true,
        currency: true,
        activityType: true,
      },
    }),
    prisma.activity.count({ where }),
  ]);

  return {
    data: activities,
    total,
  };
};

export const getActivityById = async (id: string): Promise<ActivityDTO> => {
  const activity = await prisma.activity.findUnique({
    where: { id },
    include: {
      address: true,
    },
  });

  if (!activity) {
    throw new Error(ACTIVITY_ERRORS.NOT_FOUND);
  }

  return {
    ...activity,
    city: activity.address.city,
    country: activity.address.country,
    addressDetails: activity.address.details,
    countryCode: activity.address.countryCode,
  };
};
