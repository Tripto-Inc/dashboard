'use server';

import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { prisma } from '@/lib/prisma';
import { Currency, CurrencyOption } from '../types';
import { CURRENCY_ERRORS } from '../constants';

export const getCurrencies = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<Currency>> => {
  const { page, pageSize, filter, sort } = params;
  const take = pageSize;
  const skip = (page - 1) * pageSize;
  const sortBy = sort[0]?.id;
  const sortOrder = sort[0]?.desc ? 'desc' : 'asc';
  const where = filter
    ? {
      OR: [
        { title: { contains: filter, mode: 'insensitive' as const } },
        { symbol: { contains: filter, mode: 'insensitive' as const } },
        { isoCode: { contains: filter, mode: 'insensitive' as const } },
      ],
    }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: 'desc' as const };

  const [currencies, total] = await Promise.all([
    prisma.currency.findMany({
      where,
      orderBy,
      skip,
      take,
    }),
    prisma.currency.count({ where }),
  ]);

  return {
    data: currencies,
    total,
  };
};

export const getCurrencyById = async (id: string): Promise<Currency> => {
  const currency = await prisma.currency.findUnique({
    where: { id },
  });

  if (!currency) {
    throw new Error(CURRENCY_ERRORS.NOT_FOUND);
  }

  return currency;
};

export const getCurrenciesDropdown = async (
  onlyActive: boolean = true,
): Promise<CurrencyOption[]> => {
  const currencies = await prisma.currency.findMany({
    where: onlyActive ? { isActive: true } : undefined,
    orderBy: { title: 'asc' },
    select: {
      id: true,
      title: true,
      isoCode: true,
    },
  });

  return currencies.map((currency) => ({
    value: currency.id,
    label: `${currency.isoCode} - ${currency.title}`,
  }));
};
