import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { revalidatePath } from 'next/cache';

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
            { city: { contains: filter, mode: 'insensitive' as const } },
            { slogan: { contains: filter, mode: 'insensitive' as const } },
            { country: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.destination.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const existing = await prisma.destination.findUnique({
      where: {
        country_city_slogan: {
          city: data.city,
          slogan: data.slogan,
          country: data.country,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN },
        { status: 409 },
      );
    }

    const hasAccommodation = await prisma.accommodation.findFirst({
      where: {
        address: {
          city: data.city,
          country: data.country,
        },
      },
      select: { id: true },
    });

    if (!hasAccommodation) {
      return NextResponse.json(
        { error: DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION },
        { status: 400 },
      );
    }

    const destination = await prisma.destination.create({
      data: {
        city: data.city,
        slogan: data.slogan,
        country: data.country,
        seasons: data.seasons,
        isActive: data.isActive,
        createdById: session.user.id,
      },
    });

    revalidatePath('/api/destinations');
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error('Create destination error:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
