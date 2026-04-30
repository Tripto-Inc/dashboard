import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteActivityType } from '../hooks/useDeleteActivityType';
import { useGetActivityTypes } from '../hooks/useGetActivityTypes';
import { activityTypeListColumns } from '../lib/activityTypeListColumns';

export const ActivityTypeList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="activity-types"
      columns={activityTypeListColumns}
      useGetHook={useGetActivityTypes}
      useDeleteHook={useDeleteActivityType}
    />
  );
};
