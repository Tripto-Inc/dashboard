'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CURRENCY_ERRORS } from '../constants';
import { CurrencyFormData } from '../types';

export const createCurrency = async (data: CurrencyFormData) => {
  const existing = await prisma.currency.findUnique({
    where: {
      title_isoCode: {
        title: data.title,
        isoCode: data.isoCode,
      },
    },
  });

  if (existing) throw new Error(CURRENCY_ERRORS.DUPLICATE_CODE_TITLE);

  const currency = await prisma.currency.create({
    data: {
      title: data.title,
      symbol: data.symbol,
      isoCode: data.isoCode,
      isActive: data.isActive,
    },
  });

  return currency;
};

export const updateCurrency = async (id: string, data: CurrencyFormData) => {
  if (!id) throw new Error(CURRENCY_ERRORS.ID_REQUIRED);

  const existing = await prisma.currency.findUnique({ where: { id } });

  if (!existing) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  const currency = await prisma.currency.update({
    where: { id },
    data: {
      title: data.title,
      symbol: data.symbol,
      isoCode: data.isoCode,
      isActive: data.isActive,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/currencies/edit/${id}`);
  return currency;
};

export const deleteCurrency = async (id: string) => {
  const existing = await prisma.currency.findUnique({ where: { id } });

  if (!existing) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  await prisma.currency.delete({ where: { id } });

  return existing.id;
};
