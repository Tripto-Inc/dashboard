'use server';

import { deleteDocument, uploadDocument } from '@/features/document';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { LISTING_ERRORS } from '../../constants';
import { CreateListingHotelPayload, UpdateListingHotelPayload } from '../types/mutations';
import { BUCKETS } from '@/features/document/constants';

export const createListingHotel = async (payload: CreateListingHotelPayload) => {
  const { data, heroImage, galleryImages, roomsGalleryImages } = payload;
  const bucket = BUCKETS.listings;

  const listing = await prisma.listing.create({
    data: {
      type: 'HOTEL',
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

      hotel: {
        create: {
          rooms: {
            create: data.rooms.map((room) => ({
              ...room,
              beds: JSON.parse(JSON.stringify(room.beds)),
              amenities: JSON.parse(JSON.stringify(room.amenities)),
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
      object: `${listing.id}/images/hero.webp`,
    });

    if (!uploadResult.success) throw new Error('Listing created, but hero image upload failed.');
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
    if (failed) throw new Error('Listing created, but some gallery uploads failed.');
  }

  if (roomsGalleryImages?.length) {
    for (let roomIndex = 0; roomIndex < roomsGalleryImages.length; roomIndex++) {
      const roomImages = roomsGalleryImages[roomIndex];

      if (roomImages?.length) {
        const roomId = listing.hotel?.rooms[roomIndex].id;
        const roomTitle = listing.hotel?.rooms[roomIndex].title;
        const results = await Promise.allSettled(
          roomImages.map((file, index) =>
            uploadDocument({
              bucket,
              object: `${listing.id}/rooms/${roomId}/images/gallery/${Date.now()}-${index + 1}.webp`,
              file,
            }),
          ),
        );

        const failed = results.some((r) => r.status === 'rejected');
        if (failed) throw new Error(`Room ${roomTitle} gallery image upload failed.`);
      }
    }
  }

  return listing;
};

export const updateListingHotel = async (payload: UpdateListingHotelPayload) => {
  const { id, data, heroImage, galleryImages, roomsGalleryImages } = payload;
  const bucket = 'listings';
  const heroImageObject = `${id}/images/hero.webp`;

  if (!id) throw new Error(LISTING_ERRORS.ID_REQUIRED);

  const existing = await prisma.listing.findUnique({
    where: { id },
    include: { hotel: { include: { rooms: true } } },
  });

  if (!existing) throw new Error(LISTING_ERRORS.NOT_FOUND);

  const result = await prisma.$transaction(async (prisma) => {
    const roomsToDelete = existing.hotel?.rooms.filter(
      (room) => !data.rooms.some((r) => r.id === room.id),
    );

    const deleteRooms = roomsToDelete?.map((room) =>
      prisma.room.delete({
        where: { id: room.id },
      }),
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
          },
        });
      } else if (!room.id && existing.hotel) {
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
          },
        });
      }
    });

    await Promise.all([...(deleteRooms || []), ...roomUpdates]);

    const updatedListing = await prisma.listing.update({
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
          },
        },
        updatedAt: new Date(),
      },
      include: {
        address: true,
        hotel: { include: { rooms: true } },
      },
    });

    if (heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: heroImage,
        object: heroImageObject,
      });

      if (!uploadResult.success) throw new Error('Listing updated, but hero image upload failed.');
    }

    if (galleryImages?.length) {
      await deleteDocument({
        bucket,
        object: `${id}/images/gallery`,
      });

      const uploadResults = await Promise.allSettled(
        galleryImages.map((file, index) =>
          uploadDocument({
            bucket,
            object: `${id}/images/gallery/${Date.now()}-${index + 1}.webp`,
            file,
          }),
        ),
      );

      const failed = uploadResults.some((r) => r.status === 'rejected');
      if (failed) throw new Error('Listing updated, but some gallery uploads failed.');
    }

    if (roomsGalleryImages?.length) {
      for (let roomIndex = 0; roomIndex < roomsGalleryImages.length; roomIndex++) {
        const roomImages = roomsGalleryImages[roomIndex];
        const room = data.rooms[roomIndex];

        if (roomImages?.length) {
          await deleteDocument({
            bucket,
            object: `${id}/rooms/${room.id}/gallery`,
          });

          const roomUploadResults = await Promise.allSettled(
            roomImages.map((file, index) =>
              uploadDocument({
                bucket,
                object: `${id}/rooms/${room.id}/images/gallery/${Date.now()}-${index + 1}.webp`,
                file,
              }),
            ),
          );

          const roomUploadFailed = roomUploadResults.some((result) => result.status === 'rejected');
          if (roomUploadFailed) throw new Error(`Room ${room.id} gallery uploads failed`);
        }
      }
    }

    return updatedListing;
  });

  revalidatePath(`/listings/edit/${id}`);

  return result;
};
