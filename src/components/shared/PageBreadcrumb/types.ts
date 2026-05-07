import { ReactNode } from 'react';

export interface PageBreadcrumbProps {
  pages?: Array<{
    route: string;
    title: ReactNode;
  }>;
  className?: string;
  hasHomePage?: boolean;
  currentPageTitle: string;
}

export interface PageBreadcrumbLoadingProps {
  className?: string;
  crumbCount?: number;
}
