import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ListingFormsWrapper } from '@/features/listing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Listing',
};

const ListingCreatePage = () => {
  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/listings',
            title: 'Listings',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <ListingFormsWrapper />
    </article>
  );
};

export default ListingCreatePage;
