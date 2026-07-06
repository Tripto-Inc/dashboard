import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { Fragment } from 'react';
import { AccommodationTagFormSkeleton } from '@/features/accommodation-tag';

const AccommodationTagEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <AccommodationTagFormSkeleton />
    </Fragment>
  );
};

export default AccommodationTagEditPageSkeleton;
