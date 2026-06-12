import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { Fragment } from 'react';
import { DestinationFormSkeleton } from '@/features/destination';

const DestinationEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <DestinationFormSkeleton />
    </Fragment>
  );
};

export default DestinationEditPageSkeleton;
