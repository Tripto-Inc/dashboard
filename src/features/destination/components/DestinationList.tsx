import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useGetDestinations } from '@/features/destination/hooks/useGetDestinations';
import { destinationListColumns } from '@/features/destination/lib/destinationListColumns';
import { useDeleteDestination } from '@/features/destination/hooks/useDeleteDestination';

export const DestinationList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="destinations"
      useGetHook={useGetDestinations}
      columns={destinationListColumns}
      useDeleteHook={useDeleteDestination}
    />
  );
};
