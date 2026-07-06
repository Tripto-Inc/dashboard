import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';
import { BUCKETS } from '@/features/document/constants';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { createHash } from 'crypto';
import { Room } from '@/features/accommodation/hotel/types/room';

function extractHash(key: string): string {
  const parts = key.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace('.webp', '');
}

async function parseHotelFormData(formData: FormData) {
  const dataRaw = formData.get('data')?.toString();
  if (!dataRaw) throw new Error('Missing "data" field');
  const data = JSON.parse(dataRaw);

  const heroImage = formData.get('heroImage') as File | null;
  const galleryImages = formData.getAll('galleryImages') as File[];

  const roomsCount = data.rooms?.length || 0;
  const roomsGalleryImages: File[][] = [];
  for (let i = 0; i < roomsCount; i++) {
    const files = formData.getAll(`roomsGalleryImages_${i}`) as File[];
    roomsGalleryImages.push(files);
  }

  return { data, heroImage, galleryImages, roomsGalleryImages };
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const { data, heroImage, galleryImages, roomsGalleryImages } =
      await parseHotelFormData(formData);
    const bucket = BUCKETS.accommodations;

    const existing = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        address: true,
        hotel: { include: { rooms: true } },
      },
    });
    if (!existing) {
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    const accommodation = await prisma.$transaction(async (tx) => {
      const incomingRoomIds = new Set(data.rooms.filter((r: Room) => r.id).map((r: Room) => r.id));
      const roomsToDelete =
        existing.hotel?.rooms.filter((room) => !incomingRoomIds.has(room.id)) ?? [];

      if (roomsToDelete.length) {
        await tx.room.deleteMany({
          where: { id: { in: roomsToDelete.map((r) => r.id) } },
        });
      }

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
              updatedById: session.user.id,
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
              createdById: session.user.id,
            },
          });
        }
      }

      return tx.accommodation.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          policies: data.policies,
          amenities: data.amenities,
          updatedAt: new Date(),
          updatedBy: { connect: { id: session.user.id } },
          tag: { connect: { id: data.tagId } },
          address: {
            update: {
              city: data.city,
              country: data.country,
              latitude: data.latitude,
              longitude: data.longitude,
              details: data.addressDetails,
              countryCode: data.countryCode,
              updatedById: session.user.id,
            },
          },
        },
        include: {
          address: true,
          hotel: { include: { rooms: true } },
        },
      });
    });

    if (heroImage) {
      const result = await uploadDocument({
        bucket,
        file: heroImage,
        object: `${id}/hero.webp`,
      });
      if (!result.success) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED },
          { status: 500 },
        );
      }
    }

    if (galleryImages.length) {
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
          uploadDocument({ bucket, object: `${prefix}${hash}.webp`, file }),
        ),
      );
      await Promise.all(toDelete.map((key) => deleteDocument({ bucket, object: key })));
    }

    const updatedRooms = accommodation.hotel?.rooms || [];

    for (let i = 0; i < updatedRooms.length; i++) {
      const room = updatedRooms[i];
      const files = roomsGalleryImages[i] || [];
      if (!files.length) continue;

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
          uploadDocument({ bucket, object: `${prefix}${hash}.webp`, file }),
        ),
      );
      await Promise.all(toDelete.map((key) => deleteDocument({ bucket, object: key })));
    }

    revalidatePath('/api/accommodations');
    revalidatePath(`/api/accommodations/${id}`);
    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Update hotel error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.UPDATE_FAILED }, { status: 500 });
  }
}
