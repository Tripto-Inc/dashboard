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
    size: 400,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'name',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'icon',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Icon" />,
    cell: ({ row }) => {
      const { icon } = row.original;
      const Icon = getTablerIcon(icon) as Icon;
      if (!Icon) return;
      return <Icon strokeWidth={1.6} className="text-slate-700" />;
    },
  },
  {
    accessorKey: 'emoji',
    size: 100,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Emoji" />,
    cell: ({ row }) => {
      const { emoji } = row.original;

      return <p className="text-lg">{emoji}</p>;
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
