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

  const accommodation = await prisma.$transaction(async (tx) => {
    const address = await tx.address.upsert({
      where: {
        countryCode_city_details: {
          city: data.city,
          details: data.addressDetails,
          countryCode: data.countryCode,
        },
      },
      update: {},
      create: {
        city: data.city,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        details: data.addressDetails,
        countryCode: data.countryCode,
        createdById: session?.user?.id,
      },
    });

    const existing = await tx.accommodation.findUnique({
      where: {
        title_addressId: {
          title: data.title,
          addressId: address.id,
        },
      },
    });

    if (existing) {
      throw new Error(ACCOMMODATION_ERRORS.DUPLICATE);
    }

    const accommodation = await tx.accommodation.create({
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,

        createdBy: {
          connect: { id: session?.user?.id },
        },

        address: {
          connect: { id: address.id },
        },

        hotel: {
          create: {
            rooms: {
              create: data.rooms.map((room) => ({
                ...room,
                beds: room.beds,
                amenities: room.amenities,
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

    return accommodation;
  });

  // =========================
  // OUTSIDE TRANSACTION (S3)
  // =========================

  if (heroImage) {
    await uploadDocument({
      bucket,
      file: heroImage,
      object: `${accommodation.id}/hero.webp`,
    });
  }

  if (galleryImages?.length) {
    await Promise.allSettled(
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
  }

  if (roomsGalleryImages?.length) {
    for (let roomIndex = 0; roomIndex < roomsGalleryImages.length; roomIndex++) {
      const roomImages = roomsGalleryImages[roomIndex];
      const room = accommodation.hotel?.rooms[roomIndex];

      if (!room || !roomImages?.length) continue;

      await Promise.allSettled(
        roomImages.map(async (file) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const hash = createHash('sha256').update(buffer).digest('hex');

          return uploadDocument({
            bucket,
            object: `${accommodation.id}/rooms/${room.id}/gallery/${hash}.webp`,
            file,
          });
        }),
      );
    }
  }

  return accommodation;
};

export const updateHotel = async (payload: UpdateHotelPayload) => {
  const { id, data, heroImage, galleryImages, roomsGalleryImages } = payload;

  const bucket = 'accommodations';

  if (!id) throw new Error(ACCOMMODATION_ERRORS.ID_REQUIRED);

  const session = await auth();

  const existing = await prisma.accommodation.findUnique({
    where: { id },
    include: {
      hotel: {
        include: { rooms: true },
      },
    },
  });

  if (!existing) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  // =========================
  // 1. DB TRANSACTION ONLY
  // =========================
  const result = await prisma.$transaction(async (tx) => {
    // --- Rooms diff ---
    const incomingRoomIds = new Set(data.rooms.filter((r) => r.id).map((r) => r.id!));

    const roomsToDelete =
      existing.hotel?.rooms.filter((room) => !incomingRoomIds.has(room.id)) ?? [];

    await tx.room.deleteMany({
      where: {
        id: { in: roomsToDelete.map((r) => r.id) },
      },
    });

    // --- Update / Create rooms ---
    for (const room of data.rooms) {
      if (room.id) {
        await tx.room.update({
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
            amenities: room.amenities,
            beds: room.beds,
            updatedAt: new Date(),
            updatedById: session?.user?.id,
          },
        });
      } else {
        await tx.room.create({
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
            amenities: room.amenities,
            beds: room.beds,
            hotelId: existing.hotel!.id,
            createdById: session?.user?.id,
          },
        });
      }
    }

    // --- Accommodation update ---
    const updatedAccommodation = await tx.accommodation.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,

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

        updatedBy: {
          connect: { id: session?.user?.id },
        },
      },
      include: {
        address: true,
        hotel: { include: { rooms: true } },
      },
    });

    return updatedAccommodation;
  });

  // =========================
  // 2. HERO IMAGE (OUTSIDE DB)
  // =========================
  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      file: heroImage,
      object: `${id}/hero.webp`,
    });

    if (!uploadResult.success) {
      throw new Error('Accommodation updated, but hero image upload failed.');
    }
  }

  // =========================
  // 3. GALLERY (OUTSIDE DB)
  // =========================
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

  // =========================
  // 4. ROOM GALLERIES (OUTSIDE DB)
  // =========================
  if (roomsGalleryImages?.length) {
    const roomMap = new Map(result.hotel?.rooms.map((room) => [room.id, room]));

    for (let i = 0; i < roomsGalleryImages.length; i++) {
      const files = roomsGalleryImages[i];
      const inputRoom = data.rooms[i];

      if (!inputRoom?.id || !files?.length) continue;

      const room = roomMap.get(inputRoom.id);
      if (!room) continue;

      const prefix = `${id}/rooms/${room.id}/gallery/`;

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
  }

  revalidatePath(`/accommodations/edit/${id}`);

  return result;
};
