import { createDropdownFetcher, createListFetcher, createSingleFetcher } from '@/utils/apiClient';
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

export const getCurrenciesDropdown = createDropdownFetcher<CurrencyOption>({
  endpoint: '/api/currencies/dropdown?onlyActive=true',
  defaultError: CURRENCY_ERRORS.GET_LIST_FAILED,
});
