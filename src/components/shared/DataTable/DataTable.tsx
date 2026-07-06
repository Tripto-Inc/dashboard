'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import {
  Column,
  flexRender,
  getCoreRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ButtonPrimary } from '../ButtonPrimary';
import { ConfirmDeleteAlert } from '../ConfirmDeleteAlert';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTablePagination } from './DataTablePagination';
import { DataTableSkeletonRow } from './DataTableSkeletonRow';
import { DataTableToolbar } from './DataTableToolbar';
import { DataTableProps } from './types';

export const DataTable = <T extends { id: string }>({
  columns,
  initialPageSize = 10,
  initialSort = { id: 'createdAt', desc: false },
  useGetHook,
  useDeleteHook,
  showActionColumn,
  showCreateButton,
  showRefetchButton,
  entityName,
}: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([initialSort]);
  const [globalFilterInput, setGlobalFilterInput] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      setGlobalFilter(globalFilterInput);
    }, 500);
    return () => clearTimeout(timeout);
  }, [globalFilterInput]);

  const deleteRecordMutation = useDeleteHook && useDeleteHook();

  const { data, isFetching, isError, refetch } = useGetHook({
    pageSize: pagination.pageSize,
    page: pagination.pageIndex + 1,
    filter: globalFilter,
    sort: sorting,
  });

  const rows = data?.data ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.ceil(total / pagination.pageSize);

  const tableColumns = showActionColumn
    ? [
        ...columns,
        {
          id: 'actions',
          header: ({ column }: { column: Column<T> }) => (
            <DataTableColumnHeader column={column} title="Actions" />
          ),
          cell: ({ row }: { row: Row<T> }) => {
            const { id } = row.original;

            return (
              <div className="space-x-1">
                <Link href={`${entityName}/edit/${id}`}>
                  <ButtonPrimary color="sky" size="icon" tone="outline">
                    <IconPencil size={16} />
                  </ButtonPrimary>
                </Link>
                <ConfirmDeleteAlert
                  onDelete={async () => {
                    if (useDeleteHook) await deleteRecordMutation?.mutateAsync(id);
                  }}
                >
                  <ButtonPrimary color="red" size="icon" tone="outline">
                    <IconTrash size={16} />
                  </ButtonPrimary>
                </ConfirmDeleteAlert>
              </div>
            );
          },
        },
      ]
    : columns;

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount,
    enableMultiSort: false,
    onSortingChange: (updater) => {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      setSorting(updater);
    },
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        entityName={entityName}
        globalFilter={globalFilterInput}
        showCreateButton={showCreateButton}
        showRefetchButton={showRefetchButton}
        onRefetch={refetch}
        onGlobalFilterChange={setGlobalFilterInput}
      />

      <div className="overflow-hidden rounded-xl border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-100 hover:bg-slate-100">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={clsx('border-zinc-200', index !== 0 ? 'border-l' : '')}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isFetching ? (
              Array.from({ length: pagination.pageSize }).map((_, idx) => (
                <DataTableSkeletonRow<T> key={idx} columns={tableColumns} />
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center text-red-500">
                  Failed to load data.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={isFetching ? 'fetching' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-12 p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} total={total} />
    </div>
  );
};
