import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { AccommodationList } from '@/features/accommodation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accommodations',
};

const AccommodationsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <PageBreadcrumb currentPageTitle="Accommodations" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Accommodations</h3>
      </div>
      <AccommodationList />
    </div>
  );
};

export default AccommodationsPage;
