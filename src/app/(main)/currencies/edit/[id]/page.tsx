import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { CurrencyForm, getCurrencyById } from '@/features/currency';

interface CurrencyParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<CurrencyParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title } = await getCurrencyById(id);
  return { title };
};

const CurrencyEditPage = async ({ params }: { params: Promise<CurrencyParams> }) => {
  const { id } = await params;
  const currency = await getCurrencyById(id);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/currencies',
            title: 'Currencies',
          },
        ]}
        className="mb-5"
        currentPageTitle={currency.title}
      />
      <CurrencyForm initialData={currency} />
    </article>
  );
};

export default CurrencyEditPage;
