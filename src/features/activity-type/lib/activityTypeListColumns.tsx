'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { getTablerIcon } from '@/utils/getTablerIcon';
import { Icon } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { ActivityType } from '../types';

export const activityTypeListColumns: ColumnDef<ActivityType>[] = [
  {
    accessorKey: 'title',
    size: 10000,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'name',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    size: 200,
    accessorKey: 'icon',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Icon" />,
    cell: ({ row }) => {
      const { icon } = row.original;
      const Icon = getTablerIcon(icon) as Icon;
      if (!Icon) return;
      return <Icon strokeWidth={1.6} className="mx-auto text-slate-700" />;
    },
  },
  {
    size: 100,
    accessorKey: 'emoji',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Emoji" />,
    cell: ({ row }) => {
      const { emoji } = row.original;

      return <p className="text-center text-lg">{emoji}</p>;
    },
  },
  {
    size: 100,
    enableSorting: false,
    accessorKey: 'isActive',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    cell: (row) => {
      const isActive = row.getValue();

      return (
        <>
          {isActive ? (
            <CheckIcon size={20} className="mx-auto text-green-600" />
          ) : (
            <XIcon size={20} className="mx-auto text-red-600" />
          )}
        </>
      );
    },
  },
];
