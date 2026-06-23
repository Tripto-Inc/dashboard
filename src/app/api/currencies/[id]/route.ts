import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const currency = await prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      return NextResponse.json({ error: CURRENCY_ERRORS.NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json(currency);
  } catch (error) {
    console.error('Error fetching currency:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.GET_FAILED }, { status: 500 });
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

    const existing = await prisma.currency.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: CURRENCY_ERRORS.NOT_FOUND }, { status: 404 });
    }

    const currency = await prisma.currency.update({
      where: { id },
      data: {
        title: data.title,
        symbol: data.symbol,
        isoCode: data.isoCode,
        isActive: data.isActive,
        updatedAt: new Date(),
        updatedById: session?.user?.id,
      },
    });

    revalidatePath('/api/currencies');
    revalidatePath(`/api/currencies/${id}`);
    return NextResponse.json(currency);
  } catch (error) {
    console.error('Update currency error:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.UPDATE_FAILED }, { status: 500 });
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

    const existing = await prisma.currency.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: CURRENCY_ERRORS.NOT_FOUND }, { status: 404 });
    }

    await prisma.currency.delete({ where: { id } });

    revalidatePath('/api/currencies');
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete currency error:', error);
    return NextResponse.json({ error: CURRENCY_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
