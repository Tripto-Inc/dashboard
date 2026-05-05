'use server';

import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { LISTING_ERRORS } from '../../constants';
import { ListingHouseFormData } from '../types/listingHouseForm';
import { createHash } from 'crypto';
import { extractHash } from '@/utils/extractHash';

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
      object: `${listing.id}/hero.webp`,
    });

    if (!uploadResult.success)
      throw new Error('Listing created successfully, but hero image upload failed.');
  }

  if (galleryImages?.length) {
    const results = await Promise.allSettled(
      galleryImages.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const hash = createHash('sha256').update(buffer).digest('hex');

        return uploadDocument({
          bucket,
          object: `${listing.id}/gallery/${hash}.webp`,
          file,
        });
      })
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
  const heroImageObject = `${id}/hero.webp`;

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
    const prefix = `${id}/gallery/`;

    // 1. Existing objects in S3
    const existingKeys = await listKeysByPrefix(bucket, prefix);
    const existingHashes = new Set(existingKeys.map(extractHash));

    // 2. Incoming files → hashes
    const incoming = await Promise.all(
      galleryImages.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const hash = createHash('sha256').update(buffer).digest('hex');
        return { file, hash };
      })
    );

    const incomingHashes = new Set(incoming.map((i) => i.hash));

    // 3. Diff
    const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));
    const toDelete = existingKeys.filter(
      (key) => !incomingHashes.has(extractHash(key))
    );

    // 4. Upload missing
    const uploadResults = await Promise.allSettled(
      toUpload.map(({ file, hash }) =>
        uploadDocument({
          bucket,
          object: `${prefix}${hash}.webp`,
          file,
        })
      )
    );

    if (uploadResults.some((r) => r.status === 'rejected')) {
      throw new Error(
        'Listing updated successfully, but some gallery uploads failed'
      );
    }

    // 5. Remove orphaned
    await Promise.all(
      toDelete.map((key) =>
        deleteDocument({
          bucket,
          object: key,
        })
      )
    );
  }

  revalidatePath(`/listings/edit/${id}`);
  return listing;
};
