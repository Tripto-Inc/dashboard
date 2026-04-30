import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteListing } from '../hooks/useDeleteListing';
import { useGetListings } from '../hooks/useGetListings';
import { listingListColumns } from '../lib/listingListColumns';

export const ListingList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="listings"
      useGetHook={useGetListings}
      useDeleteHook={useDeleteListing}
      columns={listingListColumns}
    />
  );
};
