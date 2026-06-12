'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { Destination } from '../types';
import { SEASONS } from '@/features/destination/lib/seasons';
import clsx from 'clsx';

export const destinationListColumns: ColumnDef<Destination>[] = [
  {
    accessorKey: 'country',
    size: 400,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
  },
  {
    accessorKey: 'city',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
  },
  {
    accessorKey: 'slogan',
    size: 200,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slogan" />,
  },
  {
    size: 150,
    enableSorting: false,
    accessorKey: 'seasons',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Seasons" />,
    cell: ({ row }) => {
      const { seasons } = row.original;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {seasons.map((season) => {
            const selectedSeason = SEASONS.find((s) => s.value === season);

            if (!selectedSeason) return null;

            const Icon = selectedSeason.icon;

            return (
              <li
                key={selectedSeason.value}
                className={clsx(
                  'flex items-center gap-1 rounded-full border border-dashed px-3 py-2',
                  selectedSeason.className,
                )}
              >
                <Icon className="size-4" />
                <p className="text-sm">{selectedSeason.title}</p>
              </li>
            );
          })}
        </ul>
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
