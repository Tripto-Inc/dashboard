'use client';

import { DataTableColumnHeader, DataTableImageCell } from '@/components/shared/DataTable';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { ListingColumns } from '../types/listing';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const listingListColumns: ColumnDef<ListingColumns>[] = [
  {
    id: 'image',
    size: 150,
    cell: ({ row }) => {
      const { id, title } = row.original;

      return <DataTableImageCell id={id} title={title} bucket="listings" />;
    },
  },
  {
    accessorKey: 'type',
    size: 150,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const { type } = row.original;

      if (type === 'HOUSE') {
        return (
          <div className="flex items-center gap-1">
            <IconHome size={16} />
            <p>House</p>
          </div>
        );
      }
      if (type === 'HOTEL') {
        return (
          <div className="flex items-center gap-1">
            <IconBuilding size={16} />
            <p>Hotel</p>
          </div>
        );
      }
    },
  },
  {
    accessorKey: 'title',
    size: 300,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'address.country',
    size: 150,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    cell: ({ row }) => {
      const {
        address: { country, countryCode },
      } = row.original;
      const countryFlag = convertCountryCodeToFlag(countryCode);

      return (
        <p className="flex items-center gap-1">
          <span className="mt-0.5">{countryFlag}</span>
          <span>{country}</span>
        </p>
      );
    },
  },
  {
    accessorKey: 'address.city',
    size: 150,
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
  },
  {
    size: 150,
    enableSorting: false,
    accessorKey: 'amenities',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amenities" />,
    cell: ({ row }) => {
      const { amenities } = row.original;
      const displayedAmenities = amenities.slice(0, 4);
      const hasMore = amenities.length > 4;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {displayedAmenities.map((amenity) => (
            <li
              key={amenity.title}
              className="flex items-center gap-1 rounded-full border border-dashed border-indigo-600 px-3 py-2 text-indigo-600"
            >
              <DynamicIcon name={amenity.icon} size={16} />
              <p className="text-sm">{amenity.title}</p>
            </li>
          ))}
          {hasMore && (
            <li className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-2 text-white">
              <p className="text-sm">+{amenities.length - 4} more</p>
            </li>
          )}
        </ul>
      );
    },
  },
  {
    size: 150,
    enableSorting: false,
    accessorKey: 'policies',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Policies" />,
    cell: ({ row }) => {
      const { policies } = row.original;
      const displayedPolicies = policies.slice(0, 3);
      const hasMore = policies.length > 3;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {displayedPolicies.map((policy) => (
            <Tooltip key={policy.title}>
              <TooltipTrigger>
                <li className="flex items-center gap-1 rounded-full border border-dashed border-slate-600 px-3 py-2 text-slate-600">
                  <DynamicIcon name={policy.icon} size={16} />
                  <p className="text-sm">{policy.title}</p>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-50">{policy.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {hasMore && (
            <li className="flex items-center gap-1 rounded-full bg-slate-500 px-3 py-2 text-white">
              <p className="text-sm">+{policies.length - 4} more</p>
            </li>
          )}
        </ul>
      );
    },
  },
];
