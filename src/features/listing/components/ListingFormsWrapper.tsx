'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { Fragment, type FC } from 'react';
import { ListingHotelForm } from '../listing-hotel/components/ListingHotelForm';
import { ListingHouseForm } from '../listing-house/components/ListingHouseForm';
import { ListingFormsWrapperProps } from '../types/listing';

export const ListingFormsWrapper: FC<ListingFormsWrapperProps> = ({ initialData }) => {
  const isEditMode = Boolean(initialData?.id);
  const activeTab = isEditMode ? initialData?.type || 'HOUSE' : 'HOUSE';

  const tabs = [
    {
      name: 'House',
      value: 'HOUSE',
      icon: IconHome,
      content: <ListingHouseForm initialData={initialData} />,
    },
    {
      name: 'Hotel',
      value: 'HOTEL',
      icon: IconBuilding,
      content: <ListingHotelForm initialData={initialData} />,
    },
  ];

  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {isEditMode ? `Edit ${initialData?.title}` : 'Create Listing'}
        </h1>
        <p className="mt-1 text-slate-500">
          {isEditMode
            ? 'Update listing details and availability.'
            : 'Create a new listing and configure its details.'}
        </p>
      </div>

      <Tabs {...(isEditMode ? { value: activeTab } : { defaultValue: 'HOUSE' })} className="gap-4">
        <TabsList className="gap-1 rounded-lg! border border-slate-200! bg-slate-100 group-data-[orientation=horizontal]/tabs:h-fit">
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex flex-col items-center gap-1 pt-2 pb-1 sm:px-5"
              disabled={isEditMode}
            >
              <Icon className="size-5" />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="relative">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Fragment>
  );
};
