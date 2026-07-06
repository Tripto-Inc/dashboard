import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { AccommodationTagForm, getAccommodationTagById } from '@/features/accommodation-tag';

type AccommodationTagParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationTagParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, emoji } = await getAccommodationTagById(id);
  return { title: `${emoji}${title}` };
};

const AccommodationTagEditPage = async ({
  params,
}: {
  params: Promise<AccommodationTagParams>;
}) => {
  const { id } = await params;
  const activityTag = await getAccommodationTagById(id);

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
        currentPageTitle={`${activityTag.emoji} ${activityTag.title}`}
      />
      <AccommodationTagForm initialData={activityTag} />
    </article>
  );
};

export default AccommodationTagEditPage;
