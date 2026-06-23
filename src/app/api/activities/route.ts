import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_ERRORS } from '@/features/activity/constants';
import { uploadDocument } from '@/features/document';
import { BUCKETS } from '@/features/document/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const filter = searchParams.get('filter') || '';
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const skip = (page - 1) * pageSize;

    const where = filter
      ? {
          OR: [
            { title: { contains: filter, mode: 'insensitive' as const } },
            {
              address: {
                country: { contains: filter, mode: 'insensitive' as const },
              },
            },
            {
              address: {
                city: { contains: filter, mode: 'insensitive' as const },
              },
            },
            {
              activityType: {
                title: { contains: filter, mode: 'insensitive' as const },
              },
            },
            { price: { equals: +filter } },
            { discount: { equals: +filter } },
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.activity.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: ACTIVITY_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bucket = BUCKETS.activities;
    const data = await request.json();

    const existing = await prisma.activity.findUnique({
      where: {
        title_activityTypeId: {
          title: data.title,
          activityTypeId: data.activityTypeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: ACTIVITY_ERRORS.DUPLICATE }, { status: 409 });
    }

    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        price: data.price,
        discount: data.discount,
        isActive: data.isActive,

        createdBy: {
          connect: { id: session?.user?.id },
        },

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
      },
    });

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        bucket,
        file: data.heroImage,
        object: `${activity.id}/hero.webp`,
      });

      if (!uploadResult.success)
        return NextResponse.json({ error: ACTIVITY_ERRORS.CREATE_IMAGE_FAILED }, { status: 500 });
    }

    revalidatePath('/api/activities');
    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Create destination error:', error);
    return NextResponse.json({ error: ACTIVITY_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
