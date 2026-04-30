import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { ListingFormSkeleton } from '@/features/listing';

const ListingEditPageSkeleton = () => {
  return (
    <>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <ListingFormSkeleton />
    </>
  );
};

export default ListingEditPageSkeleton;
