import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';
import { generateApiParams } from '@/utils/generateApiParams';

export async function GET(request: NextRequest) {
  try {
    const { filter, sortBy, sortOrder, skip, take } = generateApiParams(
      request.nextUrl.searchParams,
    );

    const where = filter
      ? {
          OR: [
            { emoji: { contains: filter, mode: 'insensitive' as const } },
            { title: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.accommodationTag.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.accommodationTag.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Error fetching accommodation tags:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const existing = await prisma.accommodationTag.findUnique({
      where: {
        title_emoji_textColor_borderColor_backgroundColor: {
          title: data.title,
          emoji: data.emoji,
          textColor: data.textColor,
          borderColor: data.borderColor,
          backgroundColor: data.backgroundColor,
        },
      },
    });

    if (existing)
      return NextResponse.json(
        { error: ACCOMMODATION_TAG_ERRORS.DUPLICATE_NAME_TITLE },
        { status: 409 },
      );

    const activityType = await prisma.accommodationTag.create({
      data: {
        title: data.title,
        emoji: data.emoji,
        isActive: data.isActive,
        textColor: data.textColor,
        borderColor: data.borderColor,
        backgroundColor: data.backgroundColor,
        createdById: session?.user?.id,
      },
    });

    revalidatePath('/api/accommodation-tags');
    return NextResponse.json(activityType, { status: 201 });
  } catch (error) {
    console.error('Create accommodation tag error:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
