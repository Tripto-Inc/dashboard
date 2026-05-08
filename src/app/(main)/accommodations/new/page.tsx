import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { AccommodationFormsWrapper } from '@/features/accommodation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Accommodation',
};

const AccommodationCreatePage = () => {
  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/accommodations',
            title: 'Accommodations',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <AccommodationFormsWrapper />
    </article>
  );
};

export default AccommodationCreatePage;
