import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ActivityTypeForm, getActivityTypeById } from '@/features/activity-type';

type ActivityTypeParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityTypeParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, emoji } = await getActivityTypeById(id);
  return { title: `${emoji}${title}` };
};

const ActivityTypeEditPage = async ({ params }: { params: Promise<ActivityTypeParams> }) => {
  const { id } = await params;
  const activityType = await getActivityTypeById(id);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/activity-types',
            title: 'Activity Types',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${activityType.emoji} ${activityType.title}`}
      />
      <ActivityTypeForm initialData={activityType} />
    </article>
  );
};

export default ActivityTypeEditPage;
