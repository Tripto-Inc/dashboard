'use server';

import { auth } from '@/auth';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';
import { BUCKETS } from '@/features/document/constants';
import { prisma } from '@/lib/prisma';
import { extractHash } from '@/utils/extractHash';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import { ACCOMMODATION_ERRORS } from '../../constants';
import { CreateHotelPayload, UpdateHotelPayload } from '../types/mutations';

export const createHotel = async (payload: CreateHotelPayload) => {
  const { data, heroImage, galleryImages, roomsGalleryImages } = payload;
  const bucket = BUCKETS.accommodations;
  const session = await auth();
  const accommodation = await prisma.accommodation.create({
    data: {
      type: 'HOTEL',
      title: data.title,
      description: data.description,
      policies: JSON.parse(JSON.stringify(data.policies)),
      amenities: JSON.parse(JSON.stringify(data.amenities)),

      createdBy: {
        connect: { id: session?.user?.id },
      },

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
            createdById: session?.user?.id,
          },
        },
      },

      hotel: {
        create: {
          rooms: {
            create: data.rooms.map((room) => ({
              ...room,
              beds: JSON.parse(JSON.stringify(room.beds)),
              amenities: JSON.parse(JSON.stringify(room.amenities)),
              createdById: session?.user?.id,
            })),
          },
        },
      },
    },
    include: {
      hotel: {
        include: {
          rooms: true,
        },
      },
    },
  });

  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      file: heroImage,
      object: `${accommodation.id}/hero.webp`,
    });

    if (!uploadResult.success)
      throw new Error('Accommodation created, but hero image upload failed.');
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
    if (failed) throw new Error('Accommodation created, but some gallery uploads failed.');
  }

  if (roomsGalleryImages?.length) {
    for (let roomIndex = 0; roomIndex < roomsGalleryImages.length; roomIndex++) {
      const roomImages = roomsGalleryImages[roomIndex];

      if (roomImages?.length) {
        const roomId = accommodation.hotel?.rooms[roomIndex].id;
        const roomTitle = accommodation.hotel?.rooms[roomIndex].title;

        const results = await Promise.allSettled(
          roomImages.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const hash = createHash('sha256').update(buffer).digest('hex');

            return uploadDocument({
              bucket,
              object: `${accommodation.id}/rooms/${roomId}/gallery/${hash}.webp`,
              file,
            });
          }),
        );

        const failed = results.some((r) => r.status === 'rejected');
        if (failed) throw new Error(`Room ${roomTitle} gallery image upload failed.`);
      }
    }
  }

  return accommodation;
};

export const updateHotel = async (payload: UpdateHotelPayload) => {
  const { id, data, heroImage, galleryImages, roomsGalleryImages } = payload;

  const bucket = 'accommodations';
  const heroImageObject = `${id}/hero.webp`;

  if (!id) throw new Error(ACCOMMODATION_ERRORS.ID_REQUIRED);
  const session = await auth();
  const existing = await prisma.accommodation.findUnique({
    where: { id },
    include: { hotel: { include: { rooms: true } } },
  });

  if (!existing) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  const result = await prisma.$transaction(async (prisma) => {
    const roomsToDelete = existing.hotel?.rooms.filter(
      (room) => !data.rooms.some((r) => r.id === room.id),
    );

    const deleteRooms = roomsToDelete?.map((room) =>
      prisma.room.delete({ where: { id: room.id } }),
    );

    const roomUpdates = data.rooms.map((room) => {
      if (room.id) {
        return prisma.room.update({
          where: { id: room.id },
          data: {
            title: room.title,
            area: room.area,
            count: room.count,
            price: room.price,
            currencyId: room.currencyId,
            discount: room.discount ?? null,
            capacity: room.capacity,
            bedrooms: room.bedrooms,
            bathrooms: room.bathrooms,
            amenities: JSON.parse(JSON.stringify(room.amenities)),
            beds: JSON.parse(JSON.stringify(room.beds)),
            updatedAt: new Date(),
            updatedById: session?.user?.id,
          },
        });
      }

      if (!room.id && existing.hotel) {
        return prisma.room.create({
          data: {
            title: room.title,
            area: room.area,
            count: room.count,
            price: room.price,
            currencyId: room.currencyId,
            discount: room.discount,
            capacity: room.capacity,
            bedrooms: room.bedrooms,
            bathrooms: room.bathrooms,
            amenities: JSON.parse(JSON.stringify(room.amenities)),
            beds: JSON.parse(JSON.stringify(room.beds)),
            hotelId: existing.hotel.id,
            createdById: session?.user?.id,
          },
        });
      }
    });

    await Promise.all([...(deleteRooms || []), ...roomUpdates]);

    const updatedAccommodation = await prisma.accommodation.update({
      where: { id },
      data: {
        type: 'HOTEL',
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
            updatedById: session?.user?.id,
          },
        },

        updatedAt: new Date(),
        updatedBy: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
      include: {
        address: true,
        hotel: { include: { rooms: true } },
      },
    });

    // -------------------------
    // HERO IMAGE
    // -------------------------
    if (heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: heroImage,
        object: heroImageObject,
      });

      if (!uploadResult.success) {
        throw new Error('Accommodation updated, but hero image upload failed.');
      }
    }

    // -------------------------
    // GALLERY (Accommodation)
    // -------------------------
    if (galleryImages?.length) {
      const prefix = `${id}/gallery/`;

      const existingKeys = await listKeysByPrefix(bucket, prefix);
      const existingHashes = new Set(existingKeys.map(extractHash));

      const incoming = await Promise.all(
        galleryImages.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = createHash('sha256').update(buffer).digest('hex');
          return { file, hash };
        }),
      );

      const incomingHashes = new Set(incoming.map((i) => i.hash));

      const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));
      const toDelete = existingKeys.filter((key) => !incomingHashes.has(extractHash(key)));

      await Promise.allSettled(
        toUpload.map(({ file, hash }) =>
          uploadDocument({
            bucket,
            object: `${prefix}${hash}.webp`,
            file,
          }),
        ),
      );

      await Promise.all(
        toDelete.map((key) =>
          deleteDocument({
            bucket,
            object: key,
          }),
        ),
      );
    }

    // -------------------------
    // ROOMS GALLERIES
    // -------------------------
    if (roomsGalleryImages?.length) {
      for (let roomIndex = 0; roomIndex < roomsGalleryImages.length; roomIndex++) {
        const files = roomsGalleryImages[roomIndex];
        const room = data.rooms[roomIndex];

        if (!room?.id || !files?.length) continue;

        const roomId = room.id;
        const prefix = `${id}/rooms/${roomId}/gallery/`;

        const existingKeys = await listKeysByPrefix(bucket, prefix);
        const existingHashes = new Set(existingKeys.map(extractHash));

        const incoming = await Promise.all(
          files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const hash = createHash('sha256').update(buffer).digest('hex');
            return { file, hash };
          }),
        );

        const incomingHashes = new Set(incoming.map((i) => i.hash));

        const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));
        const toDelete = existingKeys.filter((key) => !incomingHashes.has(extractHash(key)));

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
          throw new Error(`Room ${roomId} gallery upload failed`);
        }

        await Promise.all(
          toDelete.map((key) =>
            deleteDocument({
              bucket,
              object: key,
            }),
          ),
        );
      }
    }

    return updatedAccommodation;
  });

  revalidatePath(`/accommodations/edit/${id}`);

  return result;
};
