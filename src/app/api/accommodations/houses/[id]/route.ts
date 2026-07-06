import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createHash } from 'crypto';
import { parseHouseFormData } from '@/features/accommodation/house/utils/parseHouseFormData';
import { auth } from '@/auth';
import { BUCKETS } from '@/features/document/constants';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@/features/document';

function extractHash(key: string): string {
  const parts = key.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace('.webp', '');
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const data = await parseHouseFormData(formData);
    const bucket = BUCKETS.accommodations;

    const existing = await prisma.accommodation.findUnique({
      where: { id },
      include: { address: true, house: true },
    });
    if (!existing) {
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    const accommodation = await prisma.accommodation.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,
        updatedAt: new Date(),
        updatedBy: { connect: { id: session.user.id } },

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
            availableDates: data.availableDates,
            updatedById: session.user.id,
          },
        },
      },
      include: { house: true, address: true },
    });

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: data.heroImage,
        object: `${id}/hero.webp`,
      });
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED },
          { status: 500 },
        );
      }
    }

    if (data.galleryImages.length > 0) {
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
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_SOME_GALLERY_FAILED },
          { status: 500 },
        );
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

    revalidatePath('/api/accommodations');
    revalidatePath(`/api/accommodations/${id}`);
    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Update accommodation error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.UPDATE_FAILED }, { status: 500 });
  }
}
