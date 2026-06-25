import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('onlyActive') !== 'false';

    const currencies = await prisma.currency.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        isoCode: true,
      },
    });

    const formattedData = currencies.map((currency) => ({
      value: currency.id,
      label: `${currency.isoCode} • ${currency.title}`,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching currencies for dropdown:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}
