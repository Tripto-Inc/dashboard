import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const activityType = await prisma.activityType.findUnique({
      where: { id },
    });

    if (!activityType)
      return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.NOT_FOUND }, { status: 404 });

    return NextResponse.json(activityType);
  } catch (error) {
    console.error('Error fetching activity type:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.GET_FAILED }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const existing = await prisma.activityType.findUnique({ where: { id } });

    if (!existing)
      return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.NOT_FOUND }, { status: 404 });

    const activityType = await prisma.activityType.update({
      where: { id },
      data: {
        name: data.name,
        icon: data.icon,
        title: data.title,
        emoji: data.emoji,
        isActive: data.isActive,
        updatedAt: new Date(),
        updatedById: session?.user?.id,
      },
    });

    revalidatePath('/api/activity-types');
    revalidatePath(`/api/activity-types/${id}`);
    return NextResponse.json(activityType);
  } catch (error) {
    console.error('Update activity type error:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.UPDATE_FAILED }, { status: 500 });
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

    const existing = await prisma.activityType.findUnique({ where: { id } });

    if (!existing)
      return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.NOT_FOUND }, { status: 404 });

    await prisma.activityType.delete({ where: { id } });

    revalidatePath('/api/activity-types');
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete activity type error:', error);
    return NextResponse.json({ error: ACTIVITY_TYPE_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
