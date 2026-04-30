'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import prisma from '@/lib/prisma';
import { LISTING_ERRORS } from '../constants';
import { ListingColumns, ListingDetails } from '../types/listing';

export const getListings = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<ListingColumns>> => {
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

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
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
    prisma.listing.count({ where }),
  ]);

  const data = listings.map((listing) => ({
    ...listing,
    policies: JSON.parse(JSON.stringify(listing.policies)),
    amenities: JSON.parse(JSON.stringify(listing.amenities)),
  }));

  return {
    data,
    total,
  };
};

export const getListingById = async (id: string): Promise<ListingDetails> => {
  const listing = await prisma.listing.findUnique({
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

  if (!listing) {
    throw new Error(LISTING_ERRORS.NOT_FOUND);
  }

  return listing;
};
