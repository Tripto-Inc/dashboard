import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteCurrency } from '../hooks/useDeleteCurrency';
import { useGetCurrencies } from '../hooks/useGetCurrencies';
import { currencyListColumns } from '../lib/currencyListColumns';

export const CurrencyList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="currencies"
      useGetHook={useGetCurrencies}
      columns={currencyListColumns}
      useDeleteHook={useDeleteCurrency}
    />
  );
};
