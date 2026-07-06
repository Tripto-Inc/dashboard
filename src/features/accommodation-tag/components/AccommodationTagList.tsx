import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteAccommodationTag } from '../hooks/useDeleteAccommodationTag';
import { useGetAccommodationTags } from '../hooks/useGetAccommodationTags';
import { accommodationTagListColumns } from '../lib/accommodationTagListColumns';

export const AccommodationTagList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="accommodation-tags"
      columns={accommodationTagListColumns}
      useGetHook={useGetAccommodationTags}
      useDeleteHook={useDeleteAccommodationTag}
    />
  );
};
