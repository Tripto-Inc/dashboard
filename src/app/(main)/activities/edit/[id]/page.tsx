import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ActivityForm, getActivityById } from '@/features/activity';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';

type ActivityParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, countryCode } = await getActivityById(id);
  const countryFlag = convertCountryCodeToFlag(countryCode);
  return { title: `${countryFlag}${title}` };
};

const ActivityEditPage = async ({ params }: { params: Promise<ActivityParams> }) => {
  const { id } = await params;
  const activity = await getActivityById(id);

  const countryFlag = convertCountryCodeToFlag(activity.countryCode);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/activities',
            title: 'Activities',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${countryFlag} ${activity.title}`}
      />
      <ActivityForm initialData={activity} />
    </article>
  );
};

export default ActivityEditPage;
