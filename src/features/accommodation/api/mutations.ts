'use server';

import { deleteDocument } from '@/features/document';
import { prisma } from '@/lib/prisma';
import { ACCOMMODATION_ERRORS } from '../constants';

export const deleteAccommodation = async (id: string) => {
  const bucket = 'accommodations';
  const heroImageObject = `${id}/hero.webp`;
  const galleryImagesObject = `${id}/gallery`;

  const existing = await prisma.accommodation.findUnique({ where: { id } });

  if (!existing) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  await prisma.accommodation.delete({ where: { id } });
  await Promise.allSettled([
    deleteDocument({ bucket, object: heroImageObject }).catch(() => {
      throw new Error('Accommodation deleted, but hero image could not be removed.');
    }),
    deleteDocument({ bucket, object: galleryImagesObject }).catch(() => {
      throw new Error('Accommodation deleted, but gallery images could not be removed.');
    }),
  ]);

  return existing.id;
};
