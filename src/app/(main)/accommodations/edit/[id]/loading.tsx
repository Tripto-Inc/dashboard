import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { AccommodationFormSkeleton } from '@/features/accommodation';

const ListingEditPageSkeleton = () => {
  return (
    <>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <AccommodationFormSkeleton />
    </>
  );
};

export default ListingEditPageSkeleton;
