'use client';

import { DataTableColumnHeader, DataTableImageCell } from '@/components/shared/DataTable';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { ActivityColumnDTO } from '../types';

export const activityListColumns: ColumnDef<ActivityColumnDTO>[] = [
  {
    id: 'image',
    size: 150,
    cell: ({ row }) => {
      const { id, title } = row.original;
      const placeholderPatternUrl = '/icons/patterns/image-placeholer/activity.svg';

      return (
        <DataTableImageCell
          id={id}
          title={title}
          bucket="activities"
          placeholderPatternUrl={placeholderPatternUrl}
        />
      );
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
    accessorKey: 'price',
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const { price, currency } = row.original;

      return (
        <p className="flex items-center gap-0.5">
          <span>{currency.symbol}</span>
          <span>{price}</span>
        </p>
      );
    },
  },
  {
    accessorKey: 'discount',
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => {
      const { discount } = row.original;

      if (!discount) return;

      return (
        <p>
          <span>{discount}</span>
          <span>%</span>
        </p>
      );
    },
  },
  {
    accessorKey: 'activityType.title',
    size: 150,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Activity Type" />,
    cell: ({ row }) => {
      const { activityType } = row.original;

      return (
        <p className="flex items-center gap-1">
          <span>{activityType.emoji}</span>
          <span>{activityType.title}</span>
        </p>
      );
    },
  },
  {
    accessorKey: 'isActive',
    size: 100,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    cell: (row) => {
      const isActive = row.getValue();

      return (
        <div>
          {isActive ? (
            <CheckIcon size={20} className="text-green-600" />
          ) : (
            <XIcon size={20} className="text-red-600" />
          )}
        </div>
      );
    },
  },
];
