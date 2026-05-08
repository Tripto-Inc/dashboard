import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { UserProfileFormSkeleton } from '@/features/user';
import { Fragment } from 'react';

const CurrencyEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <UserProfileFormSkeleton />
    </Fragment>
  );
};

export default CurrencyEditPageSkeleton;
