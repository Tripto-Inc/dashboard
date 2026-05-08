import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { UserProfileForm } from '@/features/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Profile',
};

const UserProfilePage = () => {
  return (
    <article className="mx-auto">
      <PageBreadcrumb className="mb-5" currentPageTitle="User Profile" />
      <UserProfileForm />
    </article>
  );
};

export default UserProfilePage;
