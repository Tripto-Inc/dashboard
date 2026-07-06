import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { AccommodationTagForm } from '@/features/accommodation-tag';

export const metadata: Metadata = {
  title: 'New Accommodation Tag',
};

const AccommodationTagCreatePage = () => {
  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/accommodation-tags',
            title: 'Accommodation Tags',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <AccommodationTagForm />
    </article>
  );
};

export default AccommodationTagCreatePage;
