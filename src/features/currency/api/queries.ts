import { createListFetcher, createSingleFetcher } from '@/utils/apiClient';
import { Currency, CurrencyOption } from '@/features/currency/types';
import { CURRENCY_ERRORS } from '@/features/currency/constants';

export const getCurrencies = createListFetcher<Currency>({
  endpoint: '/api/currencies',
  defaultError: CURRENCY_ERRORS.GET_LIST_FAILED,
});

export const getCurrencyById = createSingleFetcher<Currency>({
  baseUrl: process.env.APP_URL,
  endpoint: '/api/currencies',
  defaultError: CURRENCY_ERRORS.GET_FAILED,
});

export const getCurrenciesDropdown = async (
  onlyActive: boolean = true,
): Promise<CurrencyOption[]> => {
  // const currencies = await prisma.currency.findMany({
  //   where: onlyActive ? { isActive: true } : undefined,
  //   orderBy: { title: 'asc' },
  //   select: {
  //     id: true,
  //     title: true,
  //     isoCode: true,
  //   },
  // });
  //
  // return currencies.map((currency) => ({
  //   value: currency.id,
  //   label: `${currency.isoCode} - ${currency.title}`,
  // }));

  return [];
};
