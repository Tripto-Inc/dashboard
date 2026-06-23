import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

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
            { symbol: { contains: filter, mode: 'insensitive' as const } },
            { isoCode: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.currency.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.currency.count({ where }),
    ]);

    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const existing = await prisma.currency.findUnique({
      where: {
        title_isoCode: {
          title: data.title,
          isoCode: data.isoCode,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: CURRENCY_ERRORS.DUPLICATE_CODE_TITLE }, { status: 409 });
    }

    const currency = await prisma.currency.create({
      data: {
        title: data.title,
        symbol: data.symbol,
        isoCode: data.isoCode,
        isActive: data.isActive,
        createdById: session?.user?.id,
      },
    });

    revalidatePath('/api/currencies');
    return NextResponse.json(currency, { status: 201 });
  } catch (error) {
    console.error('Create destination error:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.CREATE_FAILED }, { status: 500 });
  }
}
