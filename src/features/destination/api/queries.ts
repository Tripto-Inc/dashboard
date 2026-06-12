'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { prisma } from '@/lib/prisma';
import { Destination } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const getDestinations = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<Destination>> => {
  const { page, pageSize, filter, sort } = params;
  const take = pageSize;
  const skip = (page - 1) * pageSize;
  const sortBy = sort[0]?.id;
  const sortOrder = sort[0]?.desc ? 'desc' : 'asc';
  const where = filter
    ? {
        OR: [
          { city: { contains: filter, mode: 'insensitive' as const } },
          { slogan: { contains: filter, mode: 'insensitive' as const } },
          { country: { contains: filter, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: 'desc' as const };

  const [destinations, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.destination.count({ where }),
  ]);

  return {
    data: destinations,
    total,
  };
};

export const getDestinationById = async (id: string): Promise<Destination> => {
  const destination = await prisma.destination.findUnique({
    where: { id },
  });

  if (!destination) {
    throw new Error(DESTINATION_ERRORS.NOT_FOUND);
  }

  return destination;
};
