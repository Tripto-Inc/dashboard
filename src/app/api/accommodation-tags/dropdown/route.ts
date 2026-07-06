import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('onlyActive') !== 'false';

    const accommodationTypes = await prisma.accommodationTag.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        emoji: true,
      },
    });

    const formattedData = accommodationTypes.map((accommodationType) => ({
      value: accommodationType.id,
      label: `${accommodationType.emoji} • ${accommodationType.title}`,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching accommodation tags for dropdown:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}
