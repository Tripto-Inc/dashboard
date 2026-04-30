'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { Currency } from '../types';

export const currencyListColumns: ColumnDef<Currency>[] = [
  {
    accessorKey: 'title',
    size: 400,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'isoCode',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="ISO Code" />,
  },
  {
    accessorKey: 'symbol',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Symbol" />,
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
