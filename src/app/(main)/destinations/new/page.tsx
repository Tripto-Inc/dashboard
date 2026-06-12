import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { DestinationForm } from '@/features/destination';

export const metadata: Metadata = {
  title: 'New Destination',
};

const DestinationCreatePage = () => {
  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/destinations',
            title: 'Destinations',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <DestinationForm />
    </article>
  );
};

export default DestinationCreatePage;
