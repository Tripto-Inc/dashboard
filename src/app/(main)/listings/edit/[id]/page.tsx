import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { getListingById, ListingFormsWrapper } from '@/features/listing';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';

interface ListingParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ListingParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const {
    title,
    address: { countryCode },
  } = await getListingById(id);
  const countryFlag = convertCountryCodeToFlag(countryCode);
  return { title: `${countryFlag}${title}` };
};

const ListingEditPage = async ({ params }: { params: Promise<ListingParams> }) => {
  const { id } = await params;
  const listing = await getListingById(id);
  const countryFlag = convertCountryCodeToFlag(listing.address.countryCode);

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
        currentPageTitle={`${countryFlag} ${listing.title}`}
      />
      <ListingFormsWrapper initialData={listing} />
    </article>
  );
};

export default ListingEditPage;
