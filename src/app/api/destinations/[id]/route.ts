import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const existing = await prisma.destination.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: DESTINATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    const duplicate = await prisma.destination.findUnique({
      where: {
        country_city_slogan: {
          city: data.city,
          slogan: data.slogan,
          country: data.country,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN },
        { status: 409 },
      );
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        city: data.city,
        slogan: data.slogan,
        country: data.country,
        seasons: data.seasons,
        isActive: data.isActive,
        updatedAt: new Date(),
        updatedById: session.user.id,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Update destination error:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.UPDATE_FAILED }, { status: 500 });
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

    const existing = await prisma.destination.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: DESTINATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    await prisma.destination.delete({ where: { id } });

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete destination error:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
