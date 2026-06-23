import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

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
            { name: { contains: filter, mode: 'insensitive' as const } },
            { icon: { contains: filter, mode: 'insensitive' as const } },
            { emoji: { contains: filter, mode: 'insensitive' as const } },
            { title: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.activityType.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.activityType.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Error fetching activity types:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const existing = await prisma.activityType.findUnique({
      where: {
        name_title: {
          name: data.name,
          title: data.title,
        },
      },
    });

    if (existing)
      return NextResponse.json(
        { error: ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE },
        { status: 409 },
      );

    const activityType = await prisma.activityType.create({
      data: {
        name: data.name,
        icon: data.icon,
        title: data.title,
        emoji: data.emoji,
        isActive: data.isActive,
        createdById: session?.user?.id,
      },
    });

    revalidatePath('/api/activity-types');
    return NextResponse.json(activityType, { status: 201 });
  } catch (error) {
    console.error('Create activity type error:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
