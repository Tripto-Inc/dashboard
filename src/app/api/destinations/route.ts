import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { revalidatePath } from 'next/cache';
import { DestinationService } from '@/features/destination/services';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      page: Number(searchParams.get('page')) || 1,
      pageSize: Number(searchParams.get('pageSize')) || 10,
      filter: searchParams.get('filter') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
    };

    const result = await DestinationService.findAll(params);

    return NextResponse.json(result);
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

    const destination = await DestinationService.create(data, session.user.id);

    revalidatePath('/api/destinations');

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN) {
        return NextResponse.json(
          { error: DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN },
          { status: 409 },
        );
      }
      if (error.message === DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION) {
        return NextResponse.json(
          { error: DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION },
          { status: 400 },
        );
      }
    }

    console.error('Create destination error:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
