'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { prisma } from '@/lib/prisma';
import { ACCOMMODATION_ERRORS } from '../constants';
import { AccommodationColumns, AccommodationDetails } from '../types/accommodation';

export const getAccommodations = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<AccommodationColumns>> => {
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
        ],
      }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: 'desc' as const };

  const [accommodations, total] = await Promise.all([
    prisma.accommodation.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        type: true,
        title: true,
        address: true,
        amenities: true,
        policies: true,
      },
    }),
    prisma.accommodation.count({ where }),
  ]);

  const data = accommodations.map((accommodation) => ({
    ...accommodation,
    policies: JSON.parse(JSON.stringify(accommodation.policies)),
    amenities: JSON.parse(JSON.stringify(accommodation.amenities)),
  }));

  return {
    data,
    total,
  };
};

export const getAccommodationById = async (id: string): Promise<AccommodationDetails> => {
  const accommodation = await prisma.accommodation.findUnique({
    where: { id },
    include: {
      house: true,
      address: true,
      hotel: {
        include: {
          rooms: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      },
    },
  });

  if (!accommodation) {
    throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);
  }

  return accommodation;
};
