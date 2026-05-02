'use server';

import { deleteDocument } from '@/features/document';
import { prisma } from '@/lib/prisma';
import { LISTING_ERRORS } from '../constants';

export const deleteListing = async (id: string) => {
  const bucket = 'listings';
  const heroImageObject = `${id}/images/hero.webp`;
  const galleryImagesObject = `${id}/images/gallery`;

  const existing = await prisma.listing.findUnique({ where: { id } });

  if (!existing) throw new Error(LISTING_ERRORS.NOT_FOUND);

  await prisma.listing.delete({ where: { id } });
  await Promise.allSettled([
    deleteDocument({ bucket, object: heroImageObject }).catch(() => {
      throw new Error('Listing deleted, but hero image could not be removed.');
    }),
    deleteDocument({ bucket, object: galleryImagesObject }).catch(() => {
      throw new Error('Listing deleted, but gallery images could not be removed.');
    }),
  ]);

  return existing.id;
};
