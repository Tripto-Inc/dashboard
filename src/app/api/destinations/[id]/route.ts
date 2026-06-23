import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { revalidatePath } from 'next/cache';
import { DestinationService } from '@/features/destination/services';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const destination = await DestinationService.findById(id);

    return NextResponse.json(destination);
  } catch (error) {
    if (error instanceof Error && error.message === DESTINATION_ERRORS.NOT_FOUND) {
      return NextResponse.json({ error: DESTINATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    console.error('Error fetching destination:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.GET_FAILED }, { status: 500 });
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

    const destination = await DestinationService.update(id, data, session.user.id);

    revalidatePath('/api/destinations');
    revalidatePath(`/api/destinations/${id}`);

    return NextResponse.json(destination);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === DESTINATION_ERRORS.NOT_FOUND) {
        return NextResponse.json({ error: DESTINATION_ERRORS.NOT_FOUND }, { status: 404 });
      }
      if (error.message === DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN) {
        return NextResponse.json(
          { error: DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN },
          { status: 409 },
        );
      }
    }

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

    await DestinationService.delete(id);

    revalidatePath('/api/destinations');
    revalidatePath(`/api/destinations/${id}`);

    return NextResponse.json({ id });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === DESTINATION_ERRORS.NOT_FOUND) {
        return NextResponse.json({ error: DESTINATION_ERRORS.NOT_FOUND }, { status: 404 });
      }
    }

    console.error('Delete destination error:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
