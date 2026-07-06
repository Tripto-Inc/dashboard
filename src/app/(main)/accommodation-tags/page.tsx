import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { AccommodationTagList } from '@/features/accommodation-tag';

export const metadata: Metadata = {
  title: 'Accommodation Tags',
};

const AccommodationTagsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <PageBreadcrumb currentPageTitle="Accommodation Tags" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Accommodation Tags</h3>
      </div>
      <AccommodationTagList />
    </div>
  );
};

export default AccommodationTagsPage;
