import { Currency as PrismaCurrency } from '@/app/generated/prisma/client';

export type Currency = PrismaCurrency;

export type CurrencyFormData = {
  title: string;
  symbol: string;
  isoCode: string;
  isActive: boolean;
};

export type CurrencyOption = {
  value: string;
  label: string;
};

export type CurrencyFormProps = {
  initialData?: Currency;
};
