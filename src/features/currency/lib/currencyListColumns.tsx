'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { Currency } from '../types';

export const currencyListColumns: ColumnDef<Currency>[] = [
  {
    accessorKey: 'title',
    size: 10000,
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
        <>
          {isActive ? (
            <CheckIcon size={20} className="text-green-600 mx-auto" />
          ) : (
            <XIcon size={20} className="text-red-600 mx-auto" />
          )}
        </>
      );
    },
  },
];
