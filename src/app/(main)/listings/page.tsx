import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ListingList } from '@/features/listing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listings',
};

const ListingsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <PageBreadcrumb currentPageTitle="Listings" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Listings</h3>
      </div>
      <ListingList />
    </div>
  );
};

export default ListingsPage;
