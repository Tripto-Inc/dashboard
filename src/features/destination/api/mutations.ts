'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { DestinationFormData } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const createDestination = async (data: DestinationFormData) => {
  const session = await auth();

  const existing = await prisma.destination.findUnique({
    where: {
      country_city_slogan: {
        city: data.city,
        slogan: data.slogan,
        country: data.country,
      },
    },
  });

  if (existing) {
    throw new Error(DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN);
  }

  const hasAccommodation = await prisma.accommodation.findFirst({
    where: {
      address: {
        city: data.city,
        country: data.country,
      },
    },
    select: { id: true },
  });

  if (!hasAccommodation) {
    throw new Error(DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION);
  }

  const destination = await prisma.destination.create({
    data: {
      city: data.city,
      slogan: data.slogan,
      country: data.country,
      seasons: data.seasons,
      isActive: data.isActive,
      createdById: session?.user?.id,
    },
  });

  return destination;
};

export const updateDestination = async (id: string, data: DestinationFormData) => {
  if (!id) throw new Error(DESTINATION_ERRORS.ID_REQUIRED);
  const session = await auth();
  const existing = await prisma.destination.findUnique({ where: { id } });

  if (!existing) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  const destination = await prisma.destination.update({
    where: { id },
    data: {
      city: data.city,
      slogan: data.slogan,
      country: data.country,
      seasons: data.seasons,
      isActive: data.isActive,
      updatedAt: new Date(),
      updatedById: session?.user?.id,
    },
  });

  revalidatePath(`/destinations/edit/${id}`);
  return destination;
};

export const deleteDestination = async (id: string) => {
  const existing = await prisma.destination.findUnique({ where: { id } });

  if (!existing) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  await prisma.destination.delete({ where: { id } });

  return existing.id;
};
