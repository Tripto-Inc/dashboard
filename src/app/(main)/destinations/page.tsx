import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { DestinationList } from '@/features/destination';

export const metadata: Metadata = {
  title: 'Destinations',
};

const DestinationsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <PageBreadcrumb currentPageTitle="Destinations" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Destinations</h3>
      </div>
      <DestinationList />
    </div>
  );
};

export default DestinationsPage;