import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { IconChevronsRight, IconHome } from '@tabler/icons-react';
import { FC, Fragment } from 'react';
import { PageBreadcrumbProps } from './types';

export const PageBreadcrumb: FC<PageBreadcrumbProps> = ({
  pages = [],
  className = '',
  currentPageTitle,
  hasHomePage = true,
}) => {
  const allPages = [
    ...(hasHomePage
      ? [
          {
            title: <IconHome className="size-4" />,
            route: '/',
          },
        ]
      : []),
    ...pages,
  ];

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {allPages.map((page, index) => (
          <Fragment key={page.route}>
            <BreadcrumbItem>
              <BreadcrumbLink href={page.route}>{page.title}</BreadcrumbLink>
            </BreadcrumbItem>

            {index < allPages.length - 1 && (
              <BreadcrumbSeparator>
                <IconChevronsRight />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}

        {allPages.length > 0 && (
          <BreadcrumbSeparator>
            <IconChevronsRight />
          </BreadcrumbSeparator>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
