import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { ActivityTypeFormSkeleton } from '@/features/activity-type';
import { Fragment } from 'react';

const ActivityTypeEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <ActivityTypeFormSkeleton />
    </Fragment>
  );
};

export default ActivityTypeEditPageSkeleton;
