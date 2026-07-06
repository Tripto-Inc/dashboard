import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const accommodationTag = await prisma.accommodationTag.findUnique({
      where: { id },
    });

    if (!accommodationTag)
      return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.NOT_FOUND }, { status: 404 });

    return NextResponse.json(accommodationTag);
  } catch (error) {
    console.error('Error fetching accommodation tag:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.GET_FAILED }, { status: 500 });
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

    const existing = await prisma.accommodationTag.findUnique({ where: { id } });

    if (!existing)
      return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.NOT_FOUND }, { status: 404 });

    const accommodationTag = await prisma.accommodationTag.update({
      where: { id },
      data: {
        title: data.title,
        emoji: data.emoji,
        isActive: data.isActive,
        textColor: data.textColor,
        borderColor: data.borderColor,
        backgroundColor: data.backgroundColor,
        updatedAt: new Date(),
        updatedById: session?.user?.id,
      },
    });

    revalidatePath('/api/accommodation-tags');
    revalidatePath(`/api/accommodation-tags/${id}`);
    return NextResponse.json(accommodationTag);
  } catch (error) {
    console.error('Update accommodation tag error:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED }, { status: 500 });
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

    const existing = await prisma.accommodationTag.findUnique({ where: { id } });

    if (!existing)
      return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.NOT_FOUND }, { status: 404 });

    await prisma.accommodationTag.delete({ where: { id } });

    revalidatePath('/api/accommodation-tags');
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete accommodation tag error:', error);
    return NextResponse.json({ error: ACCOMMODATION_TAG_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
