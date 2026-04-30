import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { ActivityFormSkeleton } from '@/features/activity';
import { Fragment } from 'react/jsx-runtime';

const ActivityEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <ActivityFormSkeleton />
    </Fragment>
  );
};

export default ActivityEditPageSkeleton;
