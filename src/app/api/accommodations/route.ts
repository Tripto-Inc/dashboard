import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AccommodationType } from '@/features/accommodation/types/accommodation';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

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
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.accommodation.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          address: true,
          amenities: true,
          policies: true,
          hotel: true,
          house: true,
          tag: true,
        },
      }),
      prisma.accommodation.count({ where }),
    ]);

    return NextResponse.json({
      data: data.map((accommodation) => ({
        id: accommodation.id,
        tag: accommodation.tag,
        title: accommodation.title,
        address: accommodation.address,
        policies: JSON.parse(JSON.stringify(accommodation.policies)),
        amenities: JSON.parse(JSON.stringify(accommodation.amenities)),
        type: (accommodation.house ? 'HOUSE' : 'HOTEL') as AccommodationType,
      })),
      total,
    });
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}
