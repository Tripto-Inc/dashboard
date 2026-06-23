import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { uploadDocument } from '@/features/document';
import { BUCKETS } from '@/features/document/constants';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { createHash } from 'crypto';
import { Room } from '@/features/accommodation/hotel/types/room';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const bucket = BUCKETS.accommodations;

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
                create: data.rooms.map((room: Room) => ({
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

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: data.heroImage,
        object: `${accommodation.id}/hero.webp`,
      });

      if (!uploadResult.success)
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED },
          { status: 500 },
        );
    }

    if (data.galleryImages?.length) {
      const results = await Promise.allSettled(
        data.galleryImages.map(async (file: File) => {
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
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED },
          { status: 500 },
        );
    }

    if (data.roomsGalleryImages?.length) {
      for (let roomIndex = 0; roomIndex < data.roomsGalleryImages.length; roomIndex++) {
        const roomImages = data.roomsGalleryImages[roomIndex];
        const room = accommodation.hotel?.rooms[roomIndex];

        if (!room || !roomImages?.length) continue;

        await Promise.allSettled(
          roomImages.map(async (file: File) => {
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

    revalidatePath('/api/accommodations');
    return NextResponse.json(accommodation, { status: 201 });
  } catch (error) {
    console.error('Create accommodation error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
