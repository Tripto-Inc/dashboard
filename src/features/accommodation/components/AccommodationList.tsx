import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteAccommodation } from '../hooks/useDeleteAccommodation';
import { useGetAccommodations } from '../hooks/useGetAccommodations';
import { accommodationListColumns } from '../lib/accommodationListColumns';

export const AccommodationList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="accommodations"
      useGetHook={useGetAccommodations}
      useDeleteHook={useDeleteAccommodation}
      columns={accommodationListColumns}
    />
  );
};
