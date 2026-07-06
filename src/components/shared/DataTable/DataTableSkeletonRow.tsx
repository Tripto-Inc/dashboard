'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import { clsx } from 'clsx';
import { ColumnDef } from '@tanstack/react-table';

export const DataTableSkeletonRow = <T,>({ columns }: { columns: ColumnDef<T>[] }) => {
  return (
    <TableRow>
      {columns.map((column, idx) => (
        <TableCell key={idx} className="p-4">
          <Skeleton
            className={clsx('h-8 w-full rounded-md', column.id === 'image' && 'h-20 w-32')}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
