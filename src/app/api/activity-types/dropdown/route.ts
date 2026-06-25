import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('onlyActive') !== 'false';

    const activityTypes = await prisma.activityType.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        emoji: true,
      },
    });

    const formattedData = activityTypes.map((activityType) => ({
      value: activityType.id,
      label: `${activityType.emoji} • ${activityType.title}`,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching activity types for dropdown:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}
