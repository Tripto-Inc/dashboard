import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useDeleteActivity } from '../hooks/useDeleteActivity';
import { useGetActivities } from '../hooks/useGetActivities';
import { activityListColumns } from '../lib/activityListColumns';

export const ActivityList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="activities"
      columns={activityListColumns}
      useGetHook={useGetActivities}
      useDeleteHook={useDeleteActivity}
    />
  );
};
