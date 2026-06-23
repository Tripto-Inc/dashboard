import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_ERRORS } from '@/features/activity/constants';
import { BUCKETS } from '@/features/document/constants';
import { deleteDocument, uploadDocument } from '@/features/document';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });

    if (!activity) return NextResponse.json({ error: ACTIVITY_ERRORS.NOT_FOUND }, { status: 404 });

    return NextResponse.json({
      ...activity,
      city: activity.address.city,
      country: activity.address.country,
      addressDetails: activity.address.details,
      countryCode: activity.address.countryCode,
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json({ error: ACTIVITY_ERRORS.GET_FAILED }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const object = `${id}/hero.webp`;
    const data = await request.json();
    const bucket = BUCKETS.activities;

    const existing = await prisma.activity.findUnique({ where: { id } });

    if (!existing) return NextResponse.json({ error: ACTIVITY_ERRORS.NOT_FOUND }, { status: 404 });

    const activity = await prisma.activity.update({
      where: { id },
      data: {
        title: data.title,
        price: data.price,
        discount: data.discount,
        isActive: data.isActive,

        currency: {
          connect: { id: data.currencyId },
        },

        activityType: {
          connect: { id: data.activityTypeId },
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
              details: data.addressDetails,
              countryCode: data.countryCode,
              createdById: session?.user?.id,
            },
          },
        },

        updatedAt: new Date(),
        updatedBy: {
          connect: { id: session?.user?.id },
        },
      },
    });

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        object,
        file: data.heroImage,
      });

      if (!uploadResult.success)
        NextResponse.json({ error: ACTIVITY_ERRORS.UPDATE_IMAGE_FAILED }, { status: 500 });
    }

    revalidatePath('/api/activities');
    revalidatePath(`/api/activities/${id}`);
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Update activity error:', error);
    return NextResponse.json({ error: ACTIVITY_ERRORS.UPDATE_FAILED }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const object = `${id}/hero.webp`;
    const bucket = BUCKETS.activities;

    const existing = await prisma.activity.findUnique({ where: { id } });

    if (!existing) return NextResponse.json({ error: ACTIVITY_ERRORS.NOT_FOUND }, { status: 404 });

    await prisma.activity.delete({ where: { id } });
    await prisma.address.delete({ where: { id: existing.addressId } });
    await deleteDocument({ bucket, object }).catch(() =>
      NextResponse.json({ error: ACTIVITY_ERRORS.DELETE_IMAGE_FAILED }, { status: 500 }),
    );

    revalidatePath('/api/activities');
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete activity error:', error);
    return NextResponse.json({ error: ACTIVITY_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
