import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';
import { BUCKETS } from '@/features/document/constants';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { extractHash } from '@/utils/extractHash';
import { createHash } from 'crypto';
import { Room } from '@/features/accommodation/hotel/types/room';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const bucket = BUCKETS.accommodations;

    const existing = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        hotel: {
          include: { rooms: true },
        },
      },
    });

    if (!existing)
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });

    const accommodation = await prisma.$transaction(async (tx) => {
      // --- Rooms diff ---
      const incomingRoomIds = new Set(data.rooms.filter((r: Room) => r.id).map((r: Room) => r.id!));

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

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: data.heroImage,
        object: `${id}/hero.webp`,
      });

      if (!uploadResult.success)
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED },
          { status: 500 },
        );
    }

    if (data.galleryImages?.length) {
      const prefix = `${id}/gallery/`;

      const existingKeys = await listKeysByPrefix(bucket, prefix);
      const existingHashes = new Set(existingKeys.map(extractHash));

      const incoming = await Promise.all(
        data.galleryImages.map(async (file: File) => {
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

    if (data.roomsGalleryImages?.length) {
      const roomMap = new Map(accommodation.hotel?.rooms.map((room) => [room.id, room]));

      for (let i = 0; i < data.roomsGalleryImages.length; i++) {
        const files = data.roomsGalleryImages[i];
        const inputRoom = data.rooms[i];

        if (!inputRoom?.id || !files?.length) continue;

        const room = roomMap.get(inputRoom.id);
        if (!room) continue;

        const prefix = `${id}/rooms/${room.id}/gallery/`;

        const existingKeys = await listKeysByPrefix(bucket, prefix);
        const existingHashes = new Set(existingKeys.map(extractHash));

        const incoming = await Promise.all(
          files.map(async (file: File) => {
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

    revalidatePath('/api/accommodations');
    revalidatePath(`/api/accommodations/${id}`);
    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Update accommodation error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.UPDATE_FAILED }, { status: 500 });
  }
}
