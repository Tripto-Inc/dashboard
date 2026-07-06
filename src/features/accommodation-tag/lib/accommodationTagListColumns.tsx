'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { AccommodationTag } from '../types';

export const accommodationTagListColumns: ColumnDef<AccommodationTag>[] = [
  {
    accessorKey: 'title',
    size: 10000,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    size: 100,
    enableSorting: false,
    accessorKey: 'textColor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Text Color" />,
    cell: ({ row }) => {
      const { textColor } = row.original;

      return <div className="mx-auto size-7 rounded-sm" style={{ backgroundColor: textColor }} />;
    },
  },
  {
    size: 100,
    enableSorting: false,
    accessorKey: 'borderColor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Border Color" />,
    cell: ({ row }) => {
      const { borderColor } = row.original;

      return <div className="mx-auto size-7 rounded-sm" style={{ backgroundColor: borderColor }} />;
    },
  },
  {
    size: 100,
    enableSorting: false,
    accessorKey: 'backgroundColor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Background Color" />,
    cell: ({ row }) => {
      const { backgroundColor } = row.original;

      return <div className="mx-auto size-7 rounded-sm" style={{ backgroundColor }} />;
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
    accessorKey: 'isActive',
    size: 100,
    enableSorting: false,
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
