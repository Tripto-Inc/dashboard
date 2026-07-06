import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createHash } from 'crypto';
import { parseHotelFormData } from '@/features/accommodation/hotel/utils/parseHotelFormData';
import { auth } from '@/auth';
import { BUCKETS } from '@/features/document/constants';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { uploadDocument } from '@/features/document';
import { Room } from '@/features/accommodation/hotel/types/room';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const { data, heroImage, galleryImages, roomsGalleryImages } =
      await parseHotelFormData(formData);
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
          createdById: session.user.id,
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
      if (existing) throw new Error(ACCOMMODATION_ERRORS.DUPLICATE);

      return tx.accommodation.create({
        data: {
          title: data.title,
          description: data.description,
          policies: data.policies,
          amenities: data.amenities,
          createdBy: { connect: { id: session.user.id } },
          address: { connect: { id: address.id } },
          tag: { connect: { id: data.tagId } },
          hotel: {
            create: {
              rooms: {
                create: data.rooms.map((room: Room) => ({
                  ...room,
                  beds: room.beds,
                  amenities: room.amenities,
                  createdById: session.user.id,
                })),
              },
            },
          },
        },
        include: {
          hotel: { include: { rooms: true } },
        },
      });
    });

    if (heroImage) {
      const result = await uploadDocument({
        bucket,
        file: heroImage,
        object: `${accommodation.id}/hero.webp`,
      });
      if (!result.success) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED },
          { status: 500 },
        );
      }
    }

    if (galleryImages.length) {
      const results = await Promise.allSettled(
        galleryImages.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = createHash('sha256').update(buffer).digest('hex');
          return uploadDocument({
            bucket,
            object: `${accommodation.id}/gallery/${hash}.webp`,
            file,
          });
        }),
      );
      if (results.some((r) => r.status === 'rejected')) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED },
          { status: 500 },
        );
      }
    }

    const rooms = accommodation.hotel?.rooms || [];
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const files = roomsGalleryImages[i] || [];
      if (!files.length) continue;

      const results = await Promise.allSettled(
        files.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = createHash('sha256').update(buffer).digest('hex');
          return uploadDocument({
            bucket,
            object: `${accommodation.id}/rooms/${room.id}/gallery/${hash}.webp`,
            file,
          });
        }),
      );
      if (results.some((r) => r.status === 'rejected')) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED },
          { status: 500 },
        );
      }
    }

    revalidatePath('/api/accommodations');
    return NextResponse.json(accommodation, { status: 201 });
  } catch (error) {
    console.error('Create hotel error:', error);
    const message = error instanceof Error ? error.message : ACCOMMODATION_ERRORS.CREATE_FAILED;
    const status = message === ACCOMMODATION_ERRORS.DUPLICATE ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
