'use server';

import { deleteDocument, uploadDocument } from '@/features/document';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { LISTING_ERRORS } from '../../constants';
import { ListingHouseFormData } from '../types/listingHouseForm';

export const createListingHouse = async (
  data: ListingHouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const bucket = 'listings';
  const existing = await prisma.listing.findUnique({
    where: {
      title: data.title,
    },
  });

  if (existing) throw new Error(LISTING_ERRORS.DUPLICATE);

  const listing = await prisma.listing.create({
    data: {
      type: 'HOUSE',
      title: data.title,
      description: data.description,

      policies: JSON.parse(JSON.stringify(data.policies)),
      amenities: JSON.parse(JSON.stringify(data.amenities)),

      address: {
        connectOrCreate: {
          where: {
            countryCode_city_details: {
              city: data.city,
              details: data.addressDetails,
              countryCode: data.countryCode,
            },
          },
          create: {
            city: data.city,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude,
            details: data.addressDetails,
            countryCode: data.countryCode,
          },
        },
      },

      house: {
        create: {
          price: data.price,
          discount: data.discount,
          capacity: data.capacity,
          area: data.area,
          floors: data.floors,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          currencyId: data.currencyId,
          availableDates: JSON.parse(JSON.stringify(data.availableDates)),
        },
      },
    },
    include: {
      house: true,
    },
  });

  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      file: heroImage,
      object: `${listing.id}/images/hero.webp`,
    });

    if (!uploadResult.success)
      throw new Error('Listing created successfully, but hero image upload failed.');
  }

  if (galleryImages?.length) {
    const results = await Promise.allSettled(
      galleryImages.map((file, index) =>
        uploadDocument({
          bucket,
          object: `${listing.id}/images/gallery/${Date.now()}-${index + 1}.webp`,
          file,
        }),
      ),
    );

    const failed = results.some((r) => r.status === 'rejected');

    if (failed)
      throw new Error('Listing created successfully, but hero some gallery uploads failed');
  }

  return listing;
};

export const updateListingHouse = async (
  id: string,
  data: ListingHouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const bucket = 'listings';
  const heroImageObject = `${id}/images/hero.webp`;

  if (!id) throw new Error(LISTING_ERRORS.ID_REQUIRED);

  const existing = await prisma.listing.findUnique({ where: { id } });

  if (!existing) throw new Error(LISTING_ERRORS.NOT_FOUND);

  const listing = await prisma.listing.update({
    where: { id },
    data: {
      type: 'HOUSE',
      title: data.title,
      description: data.description,

      policies: JSON.parse(JSON.stringify(data.policies)),
      amenities: JSON.parse(JSON.stringify(data.amenities)),

      address: {
        update: {
          city: data.city,
          country: data.country,
          latitude: data.latitude,
          longitude: data.longitude,
          details: data.addressDetails,
          countryCode: data.countryCode,
        },
      },

      house: {
        update: {
          price: data.price,
          discount: data.discount,
          capacity: data.capacity,
          area: data.area,
          floors: data.floors,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          currencyId: data.currencyId,
          availableDates: JSON.parse(JSON.stringify(data.availableDates)),
        },
      },

      updatedAt: new Date(),
    },
    include: {
      house: true,
      address: true,
    },
  });

  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      file: heroImage,
      object: heroImageObject,
    });

    if (!uploadResult.success)
      throw new Error('Listing updated successfully, but hero image upload failed.');
  }

  if (galleryImages?.length) {
    await deleteDocument({
      bucket,
      object: `${id}/images/gallery`,
    });

    const results = await Promise.allSettled(
      galleryImages.map((file, index) =>
        uploadDocument({
          bucket,
          object: `${id}/images/gallery/${Date.now()}-${index + 1}.webp`,
          file,
        }),
      ),
    );

    const failed = results.some((r) => r.status === 'rejected');

    if (failed)
      throw new Error('Listing updated successfully, but hero some gallery uploads failed');
  }

  revalidatePath(`/listings/edit/${id}`);
  return listing;
};
