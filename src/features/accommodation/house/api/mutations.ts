'use server';

import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';
import { prisma } from '@/lib/prisma';
import { extractHash } from '@/utils/extractHash';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import { ACCOMMODATION_ERRORS } from '../../constants';
import { HouseFormData } from '../types/houseForm';

export const createHouse = async (
  data: HouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const bucket = 'accommodations';
  const existing = await prisma.accommodation.findUnique({
    where: {
      title: data.title,
    },
  });

  if (existing) throw new Error(ACCOMMODATION_ERRORS.DUPLICATE);

  const accommodation = await prisma.accommodation.create({
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
      object: `${accommodation.id}/hero.webp`,
    });

    if (!uploadResult.success)
      throw new Error('Accommodation created successfully, but hero image upload failed.');
  }

  if (galleryImages?.length) {
    const results = await Promise.allSettled(
      galleryImages.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const hash = createHash('sha256').update(buffer).digest('hex');

        return uploadDocument({
          bucket,
          object: `${accommodation.id}/gallery/${hash}.webp`,
          file,
        });
      }),
    );

    const failed = results.some((r) => r.status === 'rejected');

    if (failed)
      throw new Error('Accommodation created successfully, but hero some gallery uploads failed');
  }

  return accommodation;
};

export const updateHouse = async (
  id: string,
  data: HouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const bucket = 'accommodations';
  const heroImageObject = `${id}/hero.webp`;

  if (!id) throw new Error(ACCOMMODATION_ERRORS.ID_REQUIRED);

  const existing = await prisma.accommodation.findUnique({ where: { id } });

  if (!existing) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  const accommodation = await prisma.accommodation.update({
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
      throw new Error('Accommodation updated successfully, but hero image upload failed.');
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
      }),
    );

    const incomingHashes = new Set(incoming.map((i) => i.hash));

    // 3. Diff
    const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));
    const toDelete = existingKeys.filter((key) => !incomingHashes.has(extractHash(key)));

    // 4. Upload missing
    const uploadResults = await Promise.allSettled(
      toUpload.map(({ file, hash }) =>
        uploadDocument({
          bucket,
          object: `${prefix}${hash}.webp`,
          file,
        }),
      ),
    );

    if (uploadResults.some((r) => r.status === 'rejected')) {
      throw new Error('Accommodation updated successfully, but some gallery uploads failed');
    }

    // 5. Remove orphaned
    await Promise.all(
      toDelete.map((key) =>
        deleteDocument({
          bucket,
          object: key,
        }),
      ),
    );
  }

  revalidatePath(`/accommodations/edit/${id}`);
  return accommodation;
};
