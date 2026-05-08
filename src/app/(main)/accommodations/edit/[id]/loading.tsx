import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { AccommodationFormSkeleton } from '@/features/accommodation';
import { Fragment } from 'react';

const ListingEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <AccommodationFormSkeleton />
    </Fragment>
  );
};

export default ListingEditPageSkeleton;
